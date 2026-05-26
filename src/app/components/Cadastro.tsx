import { useState } from 'react';
import { useNavigate } from 'react-router';
import { getPenaData, saveLeadData } from '../utils/storage';

export default function Cadastro() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [processo, setProcesso] = useState('');

  const isFormValid = () => {
    return nome.trim() !== '' && whatsapp.trim() !== '' && email.trim() !== '';
  };

  const handleSubmit = () => {
    const penaData = getPenaData();

    const leadData = {
      nome,
      whatsapp,
      email,
      processo,
      data: new Date().toLocaleDateString('pt-BR'),
      pena: `${penaData.anos}a ${penaData.meses}m ${penaData.dias}d`,
      crime: penaData.tipoAtual === 'hediondo' ? 'Hediondo' : 'Comum',
      reincidente: penaData.status === 'reincidente' ? 'Sim' : 'Não',
    };

    saveLeadData(leadData);
    navigate('/resultado');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="font-bold mb-8">Cadastro para Visualizar Resultado</h1>

        <div className="space-y-6">
          <div>
            <label className="block mb-2">
              Nome completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3"
              placeholder="Digite seu nome completo"
            />
          </div>

          <div>
            <label className="block mb-2">
              WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3"
              placeholder="(00) 00000-0000"
            />
          </div>

          <div>
            <label className="block mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block mb-2">Número do processo (opcional)</label>
            <input
              type="text"
              value={processo}
              onChange={(e) => setProcesso(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3"
              placeholder="0000000-00.0000.0.00.0000"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className="w-full bg-blue-900 text-white py-4 rounded-lg hover:bg-blue-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed mt-8"
          >
            VER RESULTADO
          </button>
        </div>
      </div>
    </div>
  );
}
