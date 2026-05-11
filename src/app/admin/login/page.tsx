"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div
      style={{ minHeight: "100dvh", background: "#fffaf0" }}
      className="flex items-center justify-center p-4"
    >
      <div className="w-full" style={{ maxWidth: "420px" }}>
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center rounded-full mb-4"
            style={{ width: 56, height: 56, background: "#f5f0e0" }}
          >
            <Lock style={{ width: 24, height: 24, color: "#1a3a3a" }} />
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#0a0a0a", margin: 0 }}>
            Admin Portal
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#6a6a6a", marginTop: 4 }}>
            SamAira Creations
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #d1c7b5",
            borderRadius: 24,
            padding: "2rem",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          <form onSubmit={handleSubmit}>
            {error && (
              <div
                className="flex items-center gap-2"
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  background: "#fef2f2",
                  color: "#ef4444",
                  fontSize: "0.875rem",
                  marginBottom: 20,
                }}
              >
                <AlertCircle style={{ width: 16, height: 16, flexShrink: 0 }} />
                {error}
              </div>
            )}

            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label
                htmlFor="email"
                style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#0a0a0a", marginBottom: 6 }}
              >
                Email
              </label>
              <div style={{ position: "relative" }}>
                <Mail
                  style={{
                    position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                    width: 16, height: 16, color: "#6a6a6a", pointerEvents: "none",
                  }}
                />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@samaira-creations.de"
                  style={{
                    display: "block", width: "100%", boxSizing: "border-box",
                    paddingTop: 10, paddingBottom: 10, paddingLeft: 40, paddingRight: 12,
                    fontSize: "0.9375rem", lineHeight: "1.5",
                    background: "#f9f6f0", border: "1.5px solid #d1c7b5",
                    borderRadius: 10, color: "#0a0a0a", outline: "none",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#1a3a3a")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#d1c7b5")}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 24 }}>
              <label
                htmlFor="password"
                style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#0a0a0a", marginBottom: 6 }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  style={{
                    position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                    width: 16, height: 16, color: "#6a6a6a", pointerEvents: "none",
                  }}
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    display: "block", width: "100%", boxSizing: "border-box",
                    paddingTop: 10, paddingBottom: 10, paddingLeft: 40, paddingRight: 44,
                    fontSize: "0.9375rem", lineHeight: "1.5",
                    background: "#f9f6f0", border: "1.5px solid #d1c7b5",
                    borderRadius: 10, color: "#0a0a0a", outline: "none",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#1a3a3a")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#d1c7b5")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    color: "#6a6a6a", padding: 4, lineHeight: 0,
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword
                    ? <EyeOff style={{ width: 16, height: 16 }} />
                    : <Eye style={{ width: 16, height: 16 }} />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <p
            style={{
              marginTop: 20, textAlign: "center",
              fontSize: "0.75rem", color: "#6a6a6a", lineHeight: 1.6,
            }}
          >
            To create your admin account, go to your Supabase project →<br />
            Authentication → Users → Add User
          </p>
        </div>
      </div>
    </div>
  );
}
