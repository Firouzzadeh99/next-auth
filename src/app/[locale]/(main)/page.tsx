import { redirect } from "next/navigation";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/next-auth" : "";

function page() {
  return redirect(`${BASE_PATH}/fa/login`);
}

export default page;
