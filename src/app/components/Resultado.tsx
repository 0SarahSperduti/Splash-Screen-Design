import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Calendar } from 'lucide-react';
import { getPenaData } from '../utils/storage';
import { calcularPena, ResultadoCalculo } from '../utils/calculations';

export default function Resultado() {
  const navigate = useNavigate();
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);

  useEffect(() => {
    const penaData = getPenaData();
    if (!penaData) {
      navigate('/');
      return;
    }

    const calc = calcularPena(penaData);
    setResultado(calc);
  }, [navigate]);

  if (!resultado) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="font-bold mb-8">Resultado do Cálculo</h1>

        <div className="space-y-4 mb-8">
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-bold text-green-900 mb-1">
                  Progressão para Semiaberto
                </h3>
                <p className="text-green-700">{resultado.progressaoSemiaberto}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-bold text-green-900 mb-1">
                  Progressão para Aberto
                </h3>
                <p className="text-green-700">{resultado.progressaoAberto}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-bold text-green-900 mb-1">
                  Livramento Condicional
                </h3>
                <p className="text-green-700">{resultado.livramentoCondicional}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mb-8">
          <p className="text-gray-600 text-center">
            Esses cálculos são estimativas com base nas informações fornecidas.
          </p>
        </div>

        <button
          onClick={() => navigate('/contato')}
          className="w-full bg-blue-900 text-white py-4 rounded-lg hover:bg-blue-800 transition-colors"
        >
          FALAR COM ADVOGADO
        </button>
      </div>
    </div>
  );
}
