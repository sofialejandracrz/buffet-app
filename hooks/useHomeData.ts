import { useState, useEffect } from 'react'
import api from '@/lib/axios'

interface Stats {
  CasosExitosos: number
  AñosExperiencia: number
  AbogadosExpertos: number
  SatisfaccionCliente: number
}

interface Service {
  Titulo: string
  Descripcion: string
  Icono: string
}

interface Testimonial {
  Nombre: string
  Rol: string
  Contenido: string
  Calificacion: number
}

interface TeamMember {
  Id: string
  Nombre: string
  Apellido: string
  Correo: string
  Cargo: string
  Especializacion: string
  Experiencia: string
  Educacion: string
  Biografia: string
  LinkedinUrl: string
  TwitterUrl: string
  Imagen: string
  SeMuestraEnWeb: boolean
  TarifaHora?: number
}

interface BlogPost {
  Id: string
  Titulo: string
  Contenido: string
  Excerpt: string
  Fecha: string
  TiempoLectura: string
  Imagen: string
  EsDestacado: boolean
  Categoria: string
  Autor: string
  Publicado: boolean
}

interface HomeData {
  Stats: Stats
  FeaturedServices: Service[]
  Testimonials: Testimonial[]
  TeamMembers?: TeamMember[]
  RecentBlogPosts?: BlogPost[]
}

interface UseHomeDataReturn {
  homeData: HomeData | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useHomeData = (): UseHomeDataReturn => {
  const [homeData, setHomeData] = useState<HomeData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchHomeData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await api.get('/home')
      
      if (response.data && response.data.success) {
        setHomeData(response.data.data)
      } else {
        throw new Error('Error en la respuesta de la API')
      }
    } catch (err) {
      console.error('Error fetching home data:', err)
      setError('Error al cargar los datos')
      
      // Datos de fallback
      const fallbackData: HomeData = {
        Stats: {
          CasosExitosos: 500,
          AñosExperiencia: 25,
          AbogadosExpertos: 15,
          SatisfaccionCliente: 98
        },
        FeaturedServices: [
          {
            Titulo: "Derecho Corporativo",
            Descripcion: "Asesoría integral para empresas, contratos comerciales y fusiones.",
            Icono: "Building2",
          },
          {
            Titulo: "Derecho de Familia",
            Descripcion: "Divorcios, custodia, adopciones y mediación familiar.",
            Icono: "Heart",
          },
          {
            Titulo: "Litigios Civiles",
            Descripcion: "Representación en disputas civiles y comerciales complejas.",
            Icono: "Gavel",
          },
          {
            Titulo: "Derecho Laboral",
            Descripcion: "Protección de derechos laborales y resolución de conflictos.",
            Icono: "Briefcase",
          },
          {
            Titulo: "Derecho Penal",
            Descripcion: "Defensa criminal con experiencia y dedicación completa.",
            Icono: "Shield",
          },
          {
            Titulo: "Derecho Inmobiliario",
            Descripcion: "Transacciones inmobiliarias y resolución de disputas de propiedad.",
            Icono: "Home",
          },
        ],
        Testimonials: [
          {
            Nombre: "María González",
            Rol: "Empresaria",
            Contenido: "Excelente servicio y profesionalismo. Me ayudaron a resolver un caso complejo de manera eficiente.",
            Calificacion: 5,
          },
          {
            Nombre: "Carlos Rodríguez",
            Rol: "Director Ejecutivo",
            Contenido: "Su experiencia en derecho corporativo fue fundamental para el éxito de nuestra fusión empresarial.",
            Calificacion: 5,
          },
          {
            Nombre: "Ana Martínez",
            Rol: "Madre de Familia",
            Contenido: "Muy agradecida por su apoyo durante mi proceso de divorcio. Siempre fueron comprensivos y profesionales.",
            Calificacion: 5,
          },
        ]
      }
      
      setHomeData(fallbackData)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchHomeData()
  }, [])

  return {
    homeData,
    isLoading,
    error,
    refetch: fetchHomeData
  }
}

export default useHomeData
