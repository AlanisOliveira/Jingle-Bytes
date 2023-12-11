import Button from "../components/button";
import { routes } from "../utils/routes";

export default function Home() {
	return (
		<>
			<div className="grid grid-flow-col grid-cols-2">
				<div className="grid-cols-1 min-h-screen">

					<img className="" alt="Img home" src="./src/assets/logo.svg" />
					<div className="flex justify-center content-center pt-[94px]">
						<div className="max-w-[80%] ">
							<div className="font-bold text-5xl text-center pb-20">
								Bem-Vindo!
							</div>
							<div className="flex flex-col gap-4">
								{
									Object.values(routes).filter((e) => e.hidden === false).map((e) => (
										<Button name={e.name} path={e.route} />
									))
								}
							</div>
						</div>
					</div>


				</div>
				<div className="grid-cols-1 bg-[#0C1811] min-h-screen " >
					<div className="flex justify-end h-full">

						<img className="" alt="Img home" src="./src/assets/imghome.svg" />
					</div>
				</div>

			</div>
		</>
	)
}