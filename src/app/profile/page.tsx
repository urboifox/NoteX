import { getUser } from "@/functions/users";

export default async function ProfilePage() {

    const user = await getUser();

    return (
      <div className="container page">
        <h1>{user?.username}</h1>
        <p>{user?.email}</p>
      </div>
    );
}
