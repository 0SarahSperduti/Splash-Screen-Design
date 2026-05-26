import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { savePenaData } from '../utils/storage';

export default function Form() {
  const navigate = useNavigate();
  const [anos, setAnos] = useState('');
  const [meses, setMeses] = useState('');
  const [dias, setDias] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [detracao, setDetracao] = useState('');
  const [tipoCrime, setTipoCrime] = useState<'comum' | 'hediondo'>('comum');
  const [status, setStatus] = useState<'primario' | 'reincidente'>('primario');

  const isFormValid = () => {
    return (
      (parseInt(anos) > 0 || parseInt(meses) > 0 || parseInt(dias) > 0) &&
      dataInicio !== ''
    );
  };

  const handleCalcular = () => {
    const data = {
      anos: parseInt(anos) || 0,
      meses: parseInt(meses) || 0,
      dias: parseInt(dias) || 0,
      dataInicio,
      detracao: parseInt(detracao) || 0,
      tipoAtual: tipoCrime,
      status,
    };

    savePenaData(data);
    navigate('/gate');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 mb-6 hover:text-gray-900"
        >
          <ChevronLeft className="w-5 h-5" />
          Voltar
        </button>

        <h1 className="font-bold mb-8">Cálculo da Pena</h1>

        <div className="space-y-6">
          <div>
            <label className="block mb-2">Pena Total</label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <input
                  type="number"
                  placeholder="Anos"
                  value={anos}
                  onChange={(e) => setAnos(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-3"
                  min="0"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Meses"
                  value={meses}
                  onChange={(e) => setMeses(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-3"
                  min="0"
                  max="11"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Dias"
                  value={dias}
                  onChange={(e) => setDias(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-3"
                  min="0"
                  max="30"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-2">Data de início da pena</label>
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2">Tempo de detração (opcional)</label>
            <input
              type="number"
              placeholder="Dias"
              value={detracao}
              onChange={(e) => setDetracao(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3"
              min="0"
            />
          </div>

          <div>
            <label className="block mb-3">Tipo de Crime</label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="tipoCrime"
                  value="comum"
                  checked={tipoCrime === 'comum'}
                  onChange={(e) => setTipoCrime(e.target.value as 'comum')}
                  className="w-5 h-5"
                />
                <span>Comum</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="tipoCrime"
                  value="hediondo"
                  checked={tipoCrime === 'hediondo'}
                  onChange={(e) => setTipoCrime(e.target.value as 'hediondo')}
                  className="w-5 h-5"
                />
                <span>Hediondo</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-3">Status do Apenado</label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="primario"
                  checked={status === 'primario'}
                  onChange={(e) => setStatus(e.target.value as 'primario')}
                  className="w-5 h-5"
                />
                <span>Primário</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="reincidente"
                  checked={status === 'reincidente'}
                  onChange={(e) => setStatus(e.target.value as 'reincidente')}
                  className="w-5 h-5"
                />
                <span>Reincidente</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleCalcular}
            disabled={!isFormValid()}
            className="w-full bg-blue-900 text-white py-4 rounded-lg hover:bg-blue-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed mt-8"
          >
            CALCULAR
          </button>
        </div>
      </div>
    </div>
  );
}
