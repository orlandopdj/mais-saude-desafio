import { useEffect, useState } from "react";
import api from "./api";
import "./App.css";

function App() {
  const [users, setUsers] = useState(null);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    api
      .get("/")
      .then((response) => setUsers(response.data))
      .catch((erro) => {
        console.error("Ops! ocorreu um erro " + erro);
      });
  }, []);

  if (!users) {
    return <h2 className="text-center text-xl mt-10">Carregando dados...</h2>;
  }

  const usuariosFiltrados = users.filter((user) =>
    user.name.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <main className="w-full">
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="py-5 text-4xl font-bold text-gray-800">
            Pesquisa de Usuários
          </h1>
          <input
            className="border border-gray-400 rounded-md p-2 w-full max-w-md mx-auto"
            type="text"
            placeholder="Digite um nome para buscar..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {usuariosFiltrados.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col"
            >
              <div className="p-6 text-center flex-grow">
                <div className="w-24 h-24 mx-auto mb-4 bg-green-700 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">
                    {item.name.charAt(0)}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.email}</p>
              </div>

              <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
                <p className="text-center text-gray-600">
                  <span className="font-semibold">Cidade:</span> {item.address.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;