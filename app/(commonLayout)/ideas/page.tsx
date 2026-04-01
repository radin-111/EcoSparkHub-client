import { getSession } from '@/Actions/auth.action'


export default async function IdeasPage() {
  const res = await getSession();
  
  return (
    <div>IdeasPage</div>
  )
}
