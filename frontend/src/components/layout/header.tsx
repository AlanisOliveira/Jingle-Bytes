import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="bg-[#F2F2F2] min-h-[10vh]">
        <Link to={"/"}>
          <img className="" alt="Img home" src="/src/assets/logo.svg" />
        </Link>
      </div>

    </>
  )
}