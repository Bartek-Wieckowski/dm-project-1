import { Tables } from '../../types/supabase';
import { supabase } from '../supabase/supabaseConfig';
import { UserSupabaseAccount } from '../types/UserSupabase.type';

export async function registerUser(
  newUser: Omit<Tables<'dm-project-1-users'>, 'id'>
) {
  const { data, error } = await supabase
    .from('dm-project-1-users')
    .insert(newUser);
  if (error) {
    throw new Error('Błąd podczas dodawania...');
  }
  if (data) {
    return data;
  } else {
    throw new Error('Nie udało się zarejestrować użytkownika.');
  }
}

export async function loginUser(
  username: string
): Promise<UserSupabaseAccount> {
  const { data, error } = await supabase
    .from('dm-project-1-users')
    .select()
    .eq('username', username)
    .single();

  if (error) {
    throw new Error('Błąd podczas logowania...');
  }
  if (data) {
    console.log(data);
    return data;
  } else {
    return null;
  }
}

export const uploadAndGenerateFileLink = async (
  fileName: string,
  file: File
) => {
  try {
    const uploadData = await supabase.storage
      .from('dm-project-1')
      .upload(fileName, file);

    if (uploadData) {
      const { data, error } = await supabase.storage
        .from('dm-project-1')
        .createSignedUrl(fileName, 365 * 24 * 60 * 60);

      if (error) {
        throw new Error(`Błąd podczas generowania linku: ${error.message}`);
      }

      return data?.signedUrl;
    }
  } catch (error) {
    console.error('Błąd:', error);
    return null;
  }
};

export const updateUserData = async (
  userId: number,
  userData: Omit<UserSupabaseAccount, 'id'>
) => {
  try {
    const { error } = await supabase
      .from('dm-project-1-users')
      .update(userData)
      .eq('id', userId);

    if (error) {
      throw new Error(
        `Błąd podczas aktualizacji danych użytkownika: ${error.message}`
      );
    }

    const { data: updatedData, error: fetchError } = await supabase
      .from('dm-project-1-users')
      .select('*')
      .eq('id', userId)
      .single();

    if (fetchError) {
      throw new Error(
        `Błąd podczas pobierania zaktualizowanych danych użytkownika: ${fetchError.message}`
      );
    }

    if (!updatedData) {
      throw new Error(`Nie znaleziono zaktualizowanych danych użytkownika o ID: ${userId}`);
    }

    // console.log('Zaktualizowane dane użytkownika:', updatedData);
    return updatedData;
  } catch (error) {
    console.error('Błąd podczas aktualizacji danych użytkownika:', error);
    throw error;
  }
};

