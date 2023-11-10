import Map from "@/components/Map";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full flex-col items-center justify-between lg:flex">
        <h1 className="text-5xl font-bold tracking-wide">
          Worst Google Reviews
        </h1>
        <p className="my-6">Browse the worst-rated locations in Google Maps</p>
        {/* <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center lg:static lg:h-auto lg:w-auto lg:bg-none">
          <p>Browse the worst-rated locations in Google Maps</p>
        </div> */}
        <div className="">
          <Map />
        </div>
      </div>
    </main>
  );
}
