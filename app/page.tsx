import Logo from "./layouts/header/Logo";
import PannerButton from "./layouts/header/PannerButton";
import Title from "./layouts/header/Title";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-[500px] flex-col items-center border border-gray-200 shadow">
      <div className="flex h-[75px] w-full flex-row items-center justify-between border-b border-gray-200 px-5">
        <div className="flex flex-row items-center">
          <Logo />
          <Title>Healthdonalds</Title>
        </div>
        <PannerButton counter={0} />
      </div>
    </main>
  );
}
