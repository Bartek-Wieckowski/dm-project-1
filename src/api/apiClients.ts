import { ClientProps } from '../types/ClientProps.type';
import { supabase } from '../supabase/supabaseConfig';
import { ClientFormValuesFromSupabase } from '../components/Clients/ClientForm';

export async function getAllClients(): Promise<ClientProps[]> {
  const { data, error } = await supabase.from('dm-project-1-clients').select();

  if (error) {
    console.error(error);
    throw new Error('Błąd ładowania danych...');
  }
  return data;
}

export async function getSingleClient(clientId: number): Promise<ClientProps> {
  const { data, error } = await supabase
    .from('dm-project-1-clients')
    .select()
    .eq('id', clientId)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Błąd ładowania danych...');
  }
  return data;
}

export async function addClient(
  newClient: Omit<ClientProps, 'id'>
): Promise<ClientProps | null> {
  try {
    const { data, error } = await supabase
      .from('dm-project-1-clients')
      .insert(newClient);

    if (error) {
      console.error(error);
      throw new Error('Błąd dodawania danych...');
    }

    if (data) {
      return data;
    }
  } catch (error) {
    console.error(error);
    throw new Error('Błąd dodawania danych...');
  }

  return null;
}

export async function updateClientById(
  updateClientData: ClientFormValuesFromSupabase,
  clientId: ClientProps['id']
): Promise<ClientProps> {
  const { data, error } = await supabase
    .from('dm-project-1-clients')
    .update(updateClientData)
    .eq('id', clientId)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Błąd podczas aktualizacji...');
  }
  return data;
}

export async function deleteClient(clientId: number): Promise<void> {
  const { error } = await supabase
    .from('dm-project-1-clients')
    .delete()
    .eq('id', clientId);

  if (error) {
    console.error(error);
    throw new Error('Błąd podczas usuwania...');
  }
}
