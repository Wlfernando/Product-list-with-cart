import CheckIn from "./_components/CheckIn";
import Showcase from "./_components/Showcase";
import CompletedOrder from "./_components/CompletedOrder";

export default function Home() {
  return (
    <div className="bg-orange-50 min-h-screen max-w-screen-2xl m-auto">
      <main className="p-3 md:p-11 flex gap-5 flex-col md:flex-row items-center md:items-start">
        <Showcase />
        <CheckIn />
        <CompletedOrder />
      </main>
    </div>
  );
}
