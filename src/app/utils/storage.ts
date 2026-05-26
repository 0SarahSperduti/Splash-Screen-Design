export interface LeadData {
  nome: string;
  whatsapp: string;
  email: string;
  processo: string;
  data: string;
  pena: string;
  crime: string;
  reincidente: string;
}

const STORAGE_KEY = 'calculadora_penal_data';
const LEADS_KEY = 'calculadora_penal_leads';

export function savePenaData(data: any) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getPenaData() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

export function saveLeadData(lead: LeadData) {
  const leads = getLeads();
  leads.push(lead);
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
}

export function getLeads(): LeadData[] {
  const data = localStorage.getItem(LEADS_KEY);
  return data ? JSON.parse(data) : [];
}

export function exportToCSV(): string {
  const leads = getLeads();
  const headers = ['Nome', 'WhatsApp', 'Email', 'Processo', 'Data', 'Pena', 'Crime', 'Reincidente'];
  const rows = leads.map(lead => [
    lead.nome,
    lead.whatsapp,
    lead.email,
    lead.processo,
    lead.data,
    lead.pena,
    lead.crime,
    lead.reincidente
  ]);

  const csv = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  return csv;
}
