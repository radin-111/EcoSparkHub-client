
import { checkCookie } from "@/Actions/auth.action";
import VerifyEmail from "@/components/modules/Auth/VerifyEmail";
import { redirect } from "next/navigation";

export default async function VerifyEmailPage() {
  const cookie = await checkCookie();
  
  if(!cookie.success || !cookie.data) {
   redirect("/login");
  }
  
  return (
    <div>
      <VerifyEmail />
    </div>
  );
}
