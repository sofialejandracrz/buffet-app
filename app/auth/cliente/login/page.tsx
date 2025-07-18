import { redirect } from 'next/navigation';

export default function ObsoleteClienteLogin() {
  redirect('/auth/login');
}
