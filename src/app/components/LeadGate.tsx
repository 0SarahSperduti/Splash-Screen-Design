import { useNavigate } from 'react-router';
import { Lock } from 'lucide-react';

export default function LeadGate() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-lg p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-blue-900" />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="font-bold">Resultado disponível</h2>

          <p className="text-gray-600">
            Para visualizar o resultado completo, preencha seus dados e receba orientação de um advogado especialista.
          </p>
        </div>

        <button
          onClick={() => navigate('/cadastro')}
          className="w-full bg-blue-900 text-white py-4 rounded-lg hover:bg-blue-800 transition-colors"
        >
          CONTINUAR
        </button>
      </div>
    </div>
  );
}
