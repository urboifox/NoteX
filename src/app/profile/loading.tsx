import UserProfileContent from '@/components/profile/UserProfileContent'

export default function UserProfileLoading() {
  return (
  <div className="container page">
    <UserProfileContent user={{} as UserResponse} />
  </div>
  )
}
