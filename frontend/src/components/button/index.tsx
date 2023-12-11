import { Link } from "react-router-dom"

type ButtonProps = {
  name: string,
  path: string
}

export default function Button({ name, path }: ButtonProps) {
  return (
    <>
      <Link to={path}>
        <div className="bg-[#0C1811] rounded-lg text-white p-4 text-center">
          {name}
        </div>
      </Link>
    </>
  )
}