import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SearchBar = ({ value, onChange }: Props) => {
  return (
    <div className="relative group w-full sm:w-72 mt-4 sm:mt-0">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Szukaj kryptowaluty..."
        className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg leading-5 bg-[#1a2332] text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-colors sm:text-sm"
      />
    </div>
  );
};

export default SearchBar;