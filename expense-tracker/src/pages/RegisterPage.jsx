import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const setField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const submit = async () => {
    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.name },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={setField("name")}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={setField("email")}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="flex items-center gap-2">
            <input
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              value={form.password}
              onChange={setField("password")}
              className="w-full rounded border px-3 py-2"
            />
            <button
              type="button"
              className="text-sm text-slate-600 hover:text-slate-900"
              onClick={() => setShowPw((prev) => !prev)}
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={submit}
          disabled={loading}
          className="w-full rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="mt-4 text-sm text-slate-600">
          Already have an account?{" "}
          <Link className="text-purple-600 hover:underline" to="/">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
