/* =====================================================================
   CONFIG.JS  -  paste your two Supabase values here, then save.

   Where to find them (Supabase dashboard, your NEW game project):
   1. Project URL: look at your browser's address bar in the Supabase
      dashboard: supabase.com/dashboard/project/abcdefghijklm
      Your Project URL is https://abcdefghijklm.supabase.co
   2. Publishable key: Project Settings > API Keys. Copy the key that
      starts with sb_publishable_ (the older "anon" key, on the same
      page under the legacy keys, also works).

   NEVER paste the secret key (sb_secret_...) or the service_role key.
   Those unlock your whole project. The engine will refuse them.

   The publishable key is meant to be public, so it's fine that this
   file goes to GitHub. This game uses no database tables, only live
   messages, so there is no private data to protect.
   ===================================================================== */

window.GAME_CONFIG = {
  SUPABASE_URL: "https://jfkwyuabwbeedtwjqctv.supabase.co",
  SUPABASE_KEY: "sb_publishable_SUg9YtHt2xVoLlZ9-wV-VA_rTL9l3HH",

  // true = practice mode always on (tabs on this computer only, no Supabase).
  // You can also add ?practice=1 to the address instead.
  PRACTICE_MODE: false
};
