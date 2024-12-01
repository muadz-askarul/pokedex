"use client";

export function PokemonInfoCard({
  title,
  list,
}: {
  title: string;
  list: string[];
}) {
  return (
    <div
      id="types"
      className="flex flex-col justify-center items-center gap-4 p-4 bg-slate-200 rounded-lg basis-1/2"
    >
      <b className="text-xl">{title}</b>
      <div className="flex gap-2">
        {list.map((item, index) => (
          <span
            key={index}
            className="uppercase p-2 bg-gray-800 text-background rounded-md"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
