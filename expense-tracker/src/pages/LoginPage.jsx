import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    const redirectIfAuthenticated = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        navigate("/dashboard", { replace: true });
      }
    };

    redirectIfAuthenticated();
  }, [navigate]);

  const setField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const submit = async () => {
    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    navigate("/dashboard");
  };

  const onKey = (e) => e.key === "Enter" && submit();

  return (
    <div className="min-h-screen flex">
      {/* Left: Dark sign-in panel */}
      <div className="hidden md:flex w-1/2 bg-[#07110f] text-white flex-col justify-center items-center p-12">
        <div className="w-full max-w-lg">
          <h2 className="text-sm tracking-widest text-green-300 mb-6">
            WELCOME BACK
          </h2>
          <h1 className="text-5xl font-extrabold mb-4">
            Sign in to
            <br />
            SpendWise
          </h1>
          <p className="text-sm text-green-200/60 mb-8">
            Track your spending, grow your wealth.
          </p>

          <div className="mb-6">
            <label className="block text-xs text-green-300 mb-2">EMAIL</label>
            <input
              type="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={setField("email")}
              onKeyDown={onKey}
              className="w-full bg-transparent border border-green-800 rounded px-4 py-3 text-green-50 placeholder-green-600 outline-none focus:border-green-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs text-green-300 mb-2">
              PASSWORD
            </label>
            <div className="flex gap-3">
              <input
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={setField("password")}
                onKeyDown={onKey}
                className="w-full bg-transparent border border-green-800 rounded px-4 py-3 text-green-50 placeholder-green-600 outline-none focus:border-green-400"
              />

              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="text-sm text-green-200/80"
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && <p className="mb-4 text-red-500">{error}</p>}

          <button
            onClick={submit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-400 to-green-500 text-black font-bold py-4 rounded-lg shadow-xl hover:from-green-300 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </div>
      </div>

      {/* Right: Green marketing panel */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gradient-to-br from-green-500 to-green-700 p-12">
        <div className="w-full max-w-md text-center text-green-900">
          <h1 className="text-4xl font-extrabold text-white mb-3">SpendWise</h1>
          <p className="text-white/90 mb-8">SMART MONEY MANAGEMENT</p>

          <ul className="text-left text-white/90 mb-8 space-y-3 list-inside">
            <li>✓ Track expenses by category</li>
            <li>✓ Set and manage monthly budgets</li>
            <li>✓ AI-powered spending insights</li>
          </ul>

          <h3 className="text-2xl font-bold text-white mb-2">
            New here?
            <br />
            Join us today
          </h3>
          <p className="text-white/80 mb-6">
            Create an account and start tracking your expenses, setting budgets,
            and building better financial habits.
          </p>

          <Link
            to="/register"
            className="inline-block bg-white/10 border border-white/30 text-white px-6 py-3 rounded-lg hover:bg-white/20"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
