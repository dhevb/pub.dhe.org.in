export { isSupabaseConfigured, getSupabaseUrl, getSupabaseAnonKey } from "./config";
export { getSupabaseServiceClient, createSupabaseBrowserClient } from "./client";
export {
  getManuscriptsFromSupabase,
  createManuscriptInSupabase,
  updateManuscriptStatusInSupabase,
  getAllManuscriptsForEditor,
  getManuscriptStatusInSupabase,
  getRecentEditorialActivity,
  supabaseManuscriptsEnabled,
  type EditorialActivityEntry,
} from "./manuscripts";
export { uploadToSupabaseStorage, deleteFromSupabaseStorage } from "./storage";
export {
  getSupabaseSetupStatus,
  runSupabaseSetup,
  type SupabaseSetupStatus,
} from "./setup";
