"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package, Layers, Image, Home, Settings,
  Plus, Edit, Trash2, Eye, MessageCircle, ChevronDown, X, Check, Upload,
  LogOut, Loader2, AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase";
import { CATEGORY_LABELS, AGE_GROUP_LABELS, type Product, type Bundle, type ProductCategory, type AgeGroup } from "@/lib/types";
import { cn } from "@/lib/utils";

type AdminTab = "dashboard" | "products" | "bundles" | "media" | "homepage" | "settings";

const adminNav = [
  { id: "dashboard", label: "Dashboard", icon: Package },
  { id: "products",  label: "Products",  icon: Package },
  { id: "bundles",   label: "Bundles",   icon: Layers },
  { id: "media",     label: "Media",     icon: Image },
  { id: "homepage",  label: "Homepage CMS", icon: Home },
  { id: "settings",  label: "Settings",  icon: Settings },
];

const CATEGORIES = Object.keys(CATEGORY_LABELS) as ProductCategory[];
const AGE_GROUPS  = Object.keys(AGE_GROUP_LABELS)  as AgeGroup[];

// ─── Generic helpers ────────────────────────────────────────────────────────

interface ModalProps { isOpen: boolean; onClose: () => void; children: React.ReactNode; title: string; }
function Modal({ isOpen, onClose, children, title }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-[var(--canvas)] rounded-[16px] w-full max-w-[32rem] max-h-[90vh] overflow-hidden shadow-xl border border-[var(--hairline)] z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-[var(--hairline)]">
          <h3 className="text-lg font-semibold text-[var(--ink)]">{title}</h3>
          <button type="button" onClick={onClose} className="p-2 rounded-[8px] hover:bg-[var(--surface-card)]">
            <X className="w-5 h-5 text-[var(--muted)]" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">{children}</div>
      </motion.div>
    </div>
  );
}

function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }: {
  isOpen: boolean; onClose: () => void; onConfirm: () => void; title: string; message: string;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="relative bg-[var(--canvas)] rounded-[16px] w-full max-w-[28rem] p-6 shadow-xl border border-[var(--hairline)] z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-[var(--ink)] mb-2">{title}</h3>
        <p className="text-[var(--muted)] mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm} className="bg-[var(--error)] hover:bg-[var(--error)]/90">Delete</Button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Product Form ─────────────────────────────────────────────────────────────

function ProductForm({ product, onSubmit, onCancel }: {
  product?: Product | null; onSubmit: (data: Partial<Product>) => Promise<void>; onCancel: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: product?.name || "",
    sku: product?.sku || "",
    price: product?.price || 0,
    originalPrice: product?.originalPrice || 0,
    category: product?.category || "hooded-towels" as ProductCategory,
    material: product?.material || "",
    description: product?.description || "",
    careInstructions: product?.careInstructions || "",
    ageGroups: product?.ageGroups || [] as AgeGroup[],
    inStock: product?.inStock ?? true,
    isBestSeller: product?.isBestSeller ?? false,
    isOrganic: product?.isOrganic ?? false,
    isNew: product?.isNew ?? false,
  });

  const toggleAgeGroup = (age: AgeGroup) => {
    setFormData(prev => ({
      ...prev,
      ageGroups: prev.ageGroups.includes(age)
        ? prev.ageGroups.filter(a => a !== age)
        : [...prev.ageGroups, age],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSubmit(formData);
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[var(--ink)] mb-2">Product Name *</label>
        <input type="text" required value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 rounded-[12px] bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--ink)]"
          placeholder="e.g., Muslin Hooded Towel - Bear" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--ink)] mb-2">SKU *</label>
          <input type="text" required value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            className="w-full px-4 py-2 rounded-[12px] bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--ink)]"
            placeholder="e.g., HT-001" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--ink)] mb-2">Price (€) *</label>
          <input type="number" required min="0" step="0.01" value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
            className="w-full px-4 py-2 rounded-[12px] bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--ink)]" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--ink)] mb-2">Category *</label>
          <select value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
            className="w-full px-4 py-2 rounded-[12px] bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--ink)]">
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{CATEGORY_LABELS[cat]}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--ink)] mb-2">Material</label>
          <input type="text" value={formData.material}
            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
            className="w-full px-4 py-2 rounded-[12px] bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--ink)]"
            placeholder="e.g., 100% Organic Cotton" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--ink)] mb-2">Description</label>
        <textarea rows={3} value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 rounded-[12px] bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--ink)] resize-none"
          placeholder="Product description..." />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--ink)] mb-2">Care Instructions</label>
        <input type="text" value={formData.careInstructions}
          onChange={(e) => setFormData({ ...formData, careInstructions: e.target.value })}
          className="w-full px-4 py-2 rounded-[12px] bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--ink)]"
          placeholder="e.g., Machine wash cold, tumble dry low" />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--ink)] mb-2">Age Groups</label>
        <div className="flex flex-wrap gap-2">
          {AGE_GROUPS.map(age => (
            <button key={age} type="button" onClick={() => toggleAgeGroup(age)}
              className={cn("px-3 py-1 rounded-full text-sm transition-colors",
                formData.ageGroups.includes(age)
                  ? "bg-[var(--brand-teal)] text-white"
                  : "bg-[var(--surface-card)] text-[var(--muted)] hover:bg-[var(--surface-soft)]")}>
              {AGE_GROUP_LABELS[age]}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {([["inStock", "In Stock"], ["isBestSeller", "Best Seller"], ["isOrganic", "Organic"], ["isNew", "New"]] as const).map(([key, label]) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={formData[key] as boolean}
              onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
              className="w-4 h-4 rounded border-[var(--hairline)]" />
            <span className="text-sm text-[var(--ink)]">{label}</span>
          </label>
        ))}
      </div>
      <div className="flex gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">Cancel</Button>
        <Button type="submit" className="flex-1" disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          {product ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  );
}

// ─── Bundle Form ──────────────────────────────────────────────────────────────

function BundleForm({ bundle, products, onSubmit, onCancel }: {
  bundle?: Bundle | null; products: Product[];
  onSubmit: (data: Partial<Bundle> & { productIds: string[] }) => Promise<void>;
  onCancel: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: bundle?.name || "",
    description: bundle?.description || "",
    price: bundle?.price || 0,
    isFeatured: bundle?.isFeatured ?? false,
    isPerfectGift: bundle?.isPerfectGift ?? false,
    productIds: bundle?.products.map(p => p.id) || [] as string[],
  });

  const toggleProduct = (id: string) => {
    setFormData(prev => ({
      ...prev,
      productIds: prev.productIds.includes(id)
        ? prev.productIds.filter(x => x !== id)
        : [...prev.productIds, id],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedProducts = products.filter(p => formData.productIds.includes(p.id));
    const originalPrice = selectedProducts.reduce((s, p) => s + p.price, 0);
    const savings = originalPrice - formData.price;
    setSaving(true);
    await onSubmit({
      ...formData,
      originalPrice,
      savings: savings > 0 ? savings : undefined,
      whatsappTemplate: `Hello SamAira Creations, I'm interested in the ${formData.name} bundle. Please share availability and next steps.`,
    });
    setSaving(false);
  };

  const selectedValue = products
    .filter(p => formData.productIds.includes(p.id))
    .reduce((s, p) => s + p.price, 0);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[var(--ink)] mb-2">Bundle Name *</label>
        <input type="text" required value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 rounded-[12px] bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--ink)]"
          placeholder="e.g., Everyday Outfit Set" />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--ink)] mb-2">Description</label>
        <textarea rows={2} value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 rounded-[12px] bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--ink)] resize-none"
          placeholder="Brief description..." />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--ink)] mb-2">Bundle Price (€) *</label>
        <input type="number" required min="0" step="0.01" value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
          className="w-full px-4 py-2 rounded-[12px] bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--ink)]" />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--ink)] mb-2">Select Products *</label>
        <div className="max-h-48 overflow-y-auto space-y-2 p-2 bg-[var(--surface-soft)] rounded-[12px]">
          {products.map(product => (
            <label key={product.id} className={cn(
              "flex items-center gap-3 p-2 rounded-[8px] cursor-pointer transition-colors",
              formData.productIds.includes(product.id)
                ? "bg-[var(--brand-teal)]/10 border border-[var(--brand-teal)]"
                : "hover:bg-[var(--surface-card)] border border-transparent")}>
              <input type="checkbox" checked={formData.productIds.includes(product.id)}
                onChange={() => toggleProduct(product.id)} className="w-4 h-4 rounded" />
              <div className="flex-1">
                <p className="text-sm font-medium text-[var(--ink)]">{product.name}</p>
                <p className="text-xs text-[var(--muted)]">€{product.price}</p>
              </div>
            </label>
          ))}
        </div>
        {formData.productIds.length > 0 && (
          <p className="mt-2 text-sm text-[var(--muted)]">
            Total value: €{selectedValue.toFixed(2)}
            {formData.price > 0 && selectedValue > formData.price && (
              <span className="ml-2 text-[var(--brand-teal)]">
                (saving €{(selectedValue - formData.price).toFixed(2)})
              </span>
            )}
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="w-4 h-4 rounded border-[var(--hairline)]" />
          <span className="text-sm text-[var(--ink)]">Featured</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={formData.isPerfectGift}
            onChange={(e) => setFormData({ ...formData, isPerfectGift: e.target.checked })}
            className="w-4 h-4 rounded border-[var(--hairline)]" />
          <span className="text-sm text-[var(--ink)]">Perfect Gift</span>
        </label>
      </div>
      <div className="flex gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">Cancel</Button>
        <Button type="submit" className="flex-1" disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          {bundle ? "Update Bundle" : "Create Bundle"}
        </Button>
      </div>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [products, setProducts] = useState<Product[]>([]);
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  const [showBundleModal, setShowBundleModal] = useState(false);
  const [editingBundle, setEditingBundle] = useState<Bundle | null>(null);
  const [deleteBundleId, setDeleteBundleId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [pRes, bRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/bundles"),
      ]);
      if (!pRes.ok || !bRes.ok) throw new Error("Failed to load data");
      const [pData, bData] = await Promise.all([pRes.json(), bRes.json()]);
      setProducts(pData);
      setBundles(bData);
    } catch {
      setError("Failed to load data. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void fetchData(); }, []); // initial data load on mount

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  // ── Product handlers ────────────────────────────────────────────────────────

  const handleSaveProduct = async (data: Partial<Product>) => {
    const isEdit = !!editingProduct;
    const url = isEdit ? `/api/products/${editingProduct!.id}` : "/api/products";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) { alert("Failed to save product. Please try again."); return; }
    const saved: Product = await res.json();

    setProducts(prev =>
      isEdit ? prev.map(p => p.id === saved.id ? saved : p) : [...prev, saved]
    );
    setShowProductModal(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = async () => {
    if (!deleteProductId) return;
    const res = await fetch(`/api/products/${deleteProductId}`, { method: "DELETE" });
    if (!res.ok) { alert("Failed to delete product."); return; }
    setProducts(prev => prev.filter(p => p.id !== deleteProductId));
    setDeleteProductId(null);
  };

  // ── Bundle handlers ─────────────────────────────────────────────────────────

  const handleSaveBundle = async (data: Partial<Bundle> & { productIds: string[] }) => {
    const isEdit = !!editingBundle;
    const url = isEdit ? `/api/bundles/${editingBundle!.id}` : "/api/bundles";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) { alert("Failed to save bundle. Please try again."); return; }
    const saved: Bundle = await res.json();

    setBundles(prev =>
      isEdit ? prev.map(b => b.id === saved.id ? saved : b) : [...prev, saved]
    );
    setShowBundleModal(false);
    setEditingBundle(null);
  };

  const handleDeleteBundle = async () => {
    if (!deleteBundleId) return;
    const res = await fetch(`/api/bundles/${deleteBundleId}`, { method: "DELETE" });
    if (!res.ok) { alert("Failed to delete bundle."); return; }
    setBundles(prev => prev.filter(b => b.id !== deleteBundleId));
    setDeleteBundleId(null);
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[var(--surface-soft)] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--canvas)] border-r border-[var(--hairline)] flex flex-col">
        <div className="p-6 border-b border-[var(--hairline)]">
          <h1 className="text-lg font-semibold text-[var(--ink)]">SamAira Admin</h1>
          <p className="text-xs text-[var(--muted)]">Management Portal</p>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {adminNav.map((item) => (
              <li key={item.id}>
                <button onClick={() => setActiveTab(item.id as AdminTab)}
                  className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-medium transition-colors",
                    activeTab === item.id
                      ? "bg-[var(--brand-teal)] text-white"
                      : "text-[var(--muted)] hover:bg-[var(--surface-card)] hover:text-[var(--ink)]")}>
                  <item.icon className="w-5 h-5" />{item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-[var(--hairline)] space-y-2">
          <Button variant="secondary" className="w-full" asChild>
            <Link href="/"><Eye className="w-4 h-4 mr-2" />View Store</Link>
          </Button>
          <Button variant="secondary" className="w-full" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="flex items-center gap-2 p-4 mb-6 rounded-[12px] bg-[var(--error)]/10 text-[var(--error)] text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
              <button onClick={fetchData} className="ml-auto underline text-xs">Retry</button>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-teal)]" />
            </div>
          ) : (
            <>
              {activeTab === "dashboard" && (
                <DashboardContent productsCount={products.length} bundlesCount={bundles.length} onNavigate={setActiveTab} />
              )}
              {activeTab === "products" && (
                <ProductsContent products={products} onAdd={() => { setEditingProduct(null); setShowProductModal(true); }}
                  onEdit={(p) => { setEditingProduct(p); setShowProductModal(true); }}
                  onDelete={(id) => setDeleteProductId(id)} />
              )}
              {activeTab === "bundles" && (
                <BundlesContent bundles={bundles} products={products}
                  onAdd={() => { setEditingBundle(null); setShowBundleModal(true); }}
                  onEdit={(b) => { setEditingBundle(b); setShowBundleModal(true); }}
                  onDelete={(id) => setDeleteBundleId(id)} />
              )}
              {activeTab === "media" && <MediaContent />}
              {activeTab === "homepage" && <HomepageContent />}
              {activeTab === "settings" && <SettingsContent />}
            </>
          )}
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showProductModal && (
          <Modal isOpen={showProductModal} onClose={() => { setShowProductModal(false); setEditingProduct(null); }}
            title={editingProduct ? "Edit Product" : "Add New Product"}>
            <ProductForm key={editingProduct?.id ?? "new-product"} product={editingProduct} onSubmit={handleSaveProduct}
              onCancel={() => { setShowProductModal(false); setEditingProduct(null); }} />
          </Modal>
        )}
        {showBundleModal && (
          <Modal isOpen={showBundleModal} onClose={() => { setShowBundleModal(false); setEditingBundle(null); }}
            title={editingBundle ? "Edit Bundle" : "Create New Bundle"}>
            <BundleForm key={editingBundle?.id ?? "new-bundle"} bundle={editingBundle} products={products} onSubmit={handleSaveBundle}
              onCancel={() => { setShowBundleModal(false); setEditingBundle(null); }} />
          </Modal>
        )}
      </AnimatePresence>

      <ConfirmDialog isOpen={!!deleteProductId} onClose={() => setDeleteProductId(null)}
        onConfirm={handleDeleteProduct} title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone." />
      <ConfirmDialog isOpen={!!deleteBundleId} onClose={() => setDeleteBundleId(null)}
        onConfirm={handleDeleteBundle} title="Delete Bundle"
        message="Are you sure you want to delete this bundle? This action cannot be undone." />
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function DashboardContent({ productsCount, bundlesCount, onNavigate }: {
  productsCount: number; bundlesCount: number; onNavigate: (tab: AdminTab) => void;
}) {
  const stats = [
    { label: "Total Products", value: productsCount, icon: Package },
    { label: "Active Bundles",  value: bundlesCount,  icon: Layers },
    { label: "WhatsApp Clicks", value: "—",           icon: MessageCircle },
    { label: "Best Sellers",    value: "—",           icon: Eye },
  ];
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-[var(--ink)] mb-2">Dashboard</h2>
        <p className="text-[var(--muted)]">Welcome back! Here&apos;s an overview of your store.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="bg-[var(--canvas)] p-6 rounded-[16px] border border-[var(--hairline)]">
            <div className="w-12 h-12 rounded-full bg-[var(--surface-card)] flex items-center justify-center mb-4">
              <stat.icon className="w-6 h-6 text-[var(--brand-teal)]" />
            </div>
            <p className="text-3xl font-semibold text-[var(--ink)]">{stat.value}</p>
            <p className="text-sm text-[var(--muted)]">{stat.label}</p>
          </motion.div>
        ))}
      </div>
      <div className="bg-[var(--canvas)] p-6 rounded-[16px] border border-[var(--hairline)]">
        <h3 className="text-lg font-semibold text-[var(--ink)] mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => onNavigate("products")}><Plus className="w-4 h-4 mr-2" />Add Product</Button>
          <Button variant="secondary" onClick={() => onNavigate("bundles")}><Layers className="w-4 h-4 mr-2" />Create Bundle</Button>
          <Button variant="secondary" onClick={() => onNavigate("media")}><Image className="w-4 h-4 mr-2" />Upload Images</Button>
        </div>
      </div>
      <div className="bg-[var(--canvas)] p-6 rounded-[16px] border border-[var(--hairline)]">
        <h3 className="text-lg font-semibold text-[var(--ink)] mb-4">Product Categories</h3>
        <div className="space-y-3">
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-[var(--body)]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Products Content ─────────────────────────────────────────────────────────

function ProductsContent({ products, onAdd, onEdit, onDelete }: {
  products: Product[]; onAdd: () => void; onEdit: (p: Product) => void; onDelete: (id: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === "all" || p.category === filterCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--ink)] mb-2">Products</h2>
          <p className="text-[var(--muted)]">Manage your product catalog</p>
        </div>
        <Button onClick={onAdd}><Plus className="w-4 h-4 mr-2" />Add Product</Button>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 bg-[var(--canvas)] p-4 rounded-[16px] border border-[var(--hairline)]">
        <input type="text" placeholder="Search products..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-[12px] bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--ink)]" />
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 rounded-[12px] bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--ink)]">
          <option value="all">All Categories</option>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>
      <div className="bg-[var(--canvas)] rounded-[16px] border border-[var(--hairline)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--surface-soft)]">
              <tr>
                {["Product", "SKU", "Category", "Price", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-6 py-4 text-sm font-semibold text-[var(--ink)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product.id} className="border-t border-[var(--hairline)]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-[8px] bg-[var(--surface-card)] overflow-hidden flex-shrink-0">
                        {product.images?.[0]
                          ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          : <span className="w-full h-full flex items-center justify-center text-xl">👶</span>}
                      </div>
                      <div>
                        <p className="font-medium text-[var(--ink)]">{product.name}</p>
                        <p className="text-xs text-[var(--muted)]">{product.material}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--muted)]">{product.sku}</td>
                  <td className="px-6 py-4 text-sm text-[var(--body)]">{CATEGORY_LABELS[product.category]}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[var(--ink)]">€{product.price}</td>
                  <td className="px-6 py-4">
                    <span className={cn("px-3 py-1 rounded-full text-xs font-medium",
                      product.inStock ? "bg-[var(--brand-mint)]/20 text-[var(--brand-teal)]" : "bg-[var(--error)]/20 text-[var(--error)]")}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => onEdit(product)} className="p-2 rounded-[8px] hover:bg-[var(--surface-card)] text-[var(--muted)] hover:text-[var(--ink)]">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDelete(product.id)} className="p-2 rounded-[8px] hover:bg-[var(--error)]/10 text-[var(--muted)] hover:text-[var(--error)]">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-[var(--muted)]">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Bundles Content ──────────────────────────────────────────────────────────

function BundlesContent({ bundles, products, onAdd, onEdit, onDelete }: {
  bundles: Bundle[]; products: Product[];
  onAdd: () => void; onEdit: (b: Bundle) => void; onDelete: (id: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--ink)] mb-2">Bundles</h2>
          <p className="text-[var(--muted)]">Manage your curated bundle sets</p>
        </div>
        <Button onClick={onAdd}><Plus className="w-4 h-4 mr-2" />Create Bundle</Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bundles.map(bundle => (
          <motion.div key={bundle.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--canvas)] p-6 rounded-[16px] border border-[var(--hairline)]">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-[var(--ink)]">{bundle.name}</h3>
                <p className="text-sm text-[var(--muted)]">{bundle.description}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => onEdit(bundle)} className="p-2 rounded-[8px] hover:bg-[var(--surface-card)] text-[var(--muted)]">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => onDelete(bundle.id)} className="p-2 rounded-[8px] hover:bg-[var(--error)]/10 text-[var(--muted)]">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {bundle.products.map(p => (
                <span key={p.id} className="px-2 py-1 rounded-full text-xs bg-[var(--surface-card)] text-[var(--body)]">
                  {p.name.split(" - ")[0]}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-[var(--hairline)]">
              <div>
                <span className="text-lg font-semibold text-[var(--ink)]">€{bundle.price}</span>
                {bundle.savings && bundle.savings > 0 && (
                  <span className="ml-2 text-sm text-[var(--brand-teal)]">save €{bundle.savings}</span>
                )}
              </div>
              <div className="flex gap-2">
                {bundle.isFeatured && (
                  <span className="px-2 py-1 rounded-full text-xs bg-[var(--brand-teal)] text-white">Featured</span>
                )}
                {bundle.isPerfectGift && (
                  <span className="px-2 py-1 rounded-full text-xs bg-[var(--brand-pink)] text-white">Gift</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        {bundles.length === 0 && (
          <div className="col-span-3 text-center py-16 text-[var(--muted)]">No bundles yet. Create your first bundle.</div>
        )}
      </div>
    </div>
  );
}

// ─── Media Content ─────────────────────────────────────────────────────────────

interface MediaRecord { id: string; filename: string; url: string; size: number; mime_type: string; created_at: string; }

function MediaContent() {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [media, setMedia] = useState<MediaRecord[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(true);
  const [copyId, setCopyId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/media").then(r => r.json()).then(data => {
      setMedia(Array.isArray(data) ? data : []);
      setLoadingMedia(false);
    });
  }, []);

  const uploadFiles = async (files: File[]) => {
    const images = files.filter(f => f.type.startsWith("image/"));
    if (!images.length) return;
    setUploading(true);
    for (const file of images) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/media/upload", { method: "POST", body: fd });
      if (res.ok) {
        const record: MediaRecord = await res.json();
        setMedia(prev => [record, ...prev]);
      }
    }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/media/${id}`, { method: "DELETE" });
    setMedia(prev => prev.filter(m => m.id !== id));
  };

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopyId(id);
    setTimeout(() => setCopyId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-[var(--ink)] mb-2">Media Library</h2>
        <p className="text-[var(--muted)]">Upload and manage product images</p>
      </div>
      <div onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); uploadFiles(Array.from(e.dataTransfer.files)); }}
        className={cn("border-2 border-dashed rounded-[16px] p-12 text-center transition-colors",
          dragOver ? "border-[var(--brand-teal)] bg-[var(--brand-teal)]/5" : "border-[var(--hairline)]")}>
        <input ref={fileInputRef} type="file" multiple accept="image/*"
          onChange={(e) => uploadFiles(Array.from(e.target.files || []))} className="hidden" />
        {uploading
          ? <Loader2 className="w-12 h-12 mx-auto mb-4 text-[var(--brand-teal)] animate-spin" />
          : <Image className="w-12 h-12 mx-auto mb-4 text-[var(--muted)]" />}
        <h3 className="text-lg font-semibold text-[var(--ink)] mb-2">
          {uploading ? "Uploading…" : "Drag & Drop Images"}
        </h3>
        <p className="text-sm text-[var(--muted)] mb-4">JPG, PNG, WebP — max 5MB each</p>
        <Button variant="secondary" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
          <Upload className="w-4 h-4 mr-2" />Select Files
        </Button>
      </div>
      <div className="bg-[var(--canvas)] p-6 rounded-[16px] border border-[var(--hairline)]">
        <h3 className="text-lg font-semibold text-[var(--ink)] mb-4">
          Uploaded Images ({media.length})
        </h3>
        {loadingMedia ? (
          <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-[var(--muted)]" /></div>
        ) : media.length === 0 ? (
          <p className="text-center text-[var(--muted)] py-8">No images uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {media.map(m => (
              <div key={m.id} className="aspect-square rounded-[12px] bg-[var(--surface-card)] overflow-hidden group relative">
                <img src={m.url} alt={m.filename} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => copyUrl(m.id, m.url)}
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30" title="Copy URL">
                    {copyId === m.id ? <Check className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button onClick={() => handleDelete(m.id)}
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Homepage CMS ─────────────────────────────────────────────────────────────

interface HomepageSection { id: string; label: string; is_visible: boolean; order_index: number; }

function HomepageContent() {
  const [sections, setSections] = useState<HomepageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [heroContent, setHeroContent] = useState({ headline: "", subheadline: "", imageUrl: "" });
  const [heroSaved, setHeroSaved] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/homepage").then(r => r.json()),
      fetch("/api/settings").then(r => r.json()),
    ]).then(([sectionsData, settingsData]) => {
      setSections(Array.isArray(sectionsData) ? sectionsData : []);
      if (settingsData.hero_content) {
        setHeroContent(settingsData.hero_content);
      }
      setLoading(false);
    });
  }, []);

  const toggleSection = async (id: string, current: boolean) => {
    setSaving(id);
    await fetch("/api/homepage", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isVisible: !current }),
    });
    setSections(prev => prev.map(s => s.id === id ? { ...s, is_visible: !current } : s));
    setSaving(null);
  };

  const saveHero = async () => {
    setSaving("hero-content");
    await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "hero_content", value: heroContent }),
    });
    setSaving(null);
    setHeroSaved(true);
    setTimeout(() => setHeroSaved(false), 3000);
  };

  if (loading) return <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-[var(--brand-teal)]" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-[var(--ink)] mb-2">Homepage CMS</h2>
        <p className="text-[var(--muted)]">Control what visitors see on the homepage</p>
      </div>
      <div className="bg-[var(--canvas)] p-6 rounded-[16px] border border-[var(--hairline)]">
        <h3 className="text-lg font-semibold text-[var(--ink)] mb-4">Section Visibility</h3>
        <div className="space-y-3">
          {sections.map(section => (
            <div key={section.id} className="flex items-center justify-between p-4 rounded-[12px] bg-[var(--surface-soft)]">
              <div className="flex items-center gap-3">
                <ChevronDown className="w-4 h-4 text-[var(--muted)]" />
                <span className="font-medium text-[var(--ink)]">{section.label}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={section.is_visible} className="sr-only peer"
                  onChange={() => toggleSection(section.id, section.is_visible)}
                  disabled={saving === section.id} />
                <div className="w-11 h-6 bg-[var(--hairline)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--brand-teal)]" />
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[var(--canvas)] p-6 rounded-[16px] border border-[var(--hairline)]">
        <h3 className="text-lg font-semibold text-[var(--ink)] mb-4">Hero Banner</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--ink)] mb-2">Headline</label>
            <input type="text" value={heroContent.headline}
              onChange={(e) => setHeroContent({ ...heroContent, headline: e.target.value })}
              className="w-full px-4 py-2 rounded-[12px] bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--ink)]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--ink)] mb-2">Subheadline</label>
            <textarea rows={3} value={heroContent.subheadline}
              onChange={(e) => setHeroContent({ ...heroContent, subheadline: e.target.value })}
              className="w-full px-4 py-2 rounded-[12px] bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--ink)] resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--ink)] mb-2">Hero Image URL (paste from Media Library)</label>
            <input type="text" value={heroContent.imageUrl} placeholder="https://..."
              onChange={(e) => setHeroContent({ ...heroContent, imageUrl: e.target.value })}
              className="w-full px-4 py-2 rounded-[12px] bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--ink)]" />
          </div>
          {heroSaved && (
            <div className="flex items-center gap-2 text-sm text-[var(--brand-teal)]">
              <Check className="w-4 h-4" /> Hero content saved.
            </div>
          )}
          <Button onClick={saveHero} disabled={saving === "hero-content"}>
            {saving === "hero-content" ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Save Hero Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Settings Content ─────────────────────────────────────────────────────────

function SettingsContent() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [storeName, setStoreName] = useState("SamAira Creations");
  const [contactEmail, setContactEmail] = useState("hello@samaira-creations.de");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(50);

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(data => {
      if (data.whatsapp_config) {
        setWhatsappNumber(data.whatsapp_config.number || "");
        setWelcomeMessage(data.whatsapp_config.welcomeMessage || "");
      }
      if (data.store_info) {
        setStoreName(data.store_info.name || "SamAira Creations");
        setContactEmail(data.store_info.email || "hello@samaira-creations.de");
        setFreeShippingThreshold(data.store_info.freeShippingThreshold || 50);
      }
      setLoading(false);
    });
  }, []);

  const saveAll = async () => {
    setSaving(true);
    await Promise.all([
      fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "whatsapp_config", value: { number: whatsappNumber, welcomeMessage } }),
      }),
      fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "store_info", value: { name: storeName, email: contactEmail, freeShippingThreshold } }),
      }),
    ]);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-[var(--brand-teal)]" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-[var(--ink)] mb-2">Settings</h2>
        <p className="text-[var(--muted)]">Configure your store</p>
      </div>
      {saved && (
        <div className="flex items-center gap-2 p-4 rounded-[12px] bg-[var(--brand-mint)]/20 text-[var(--brand-teal)] text-sm">
          <Check className="w-4 h-4" />Settings saved successfully.
        </div>
      )}
      <div className="bg-[var(--canvas)] p-6 rounded-[16px] border border-[var(--hairline)]">
        <h3 className="text-lg font-semibold text-[var(--ink)] mb-4">WhatsApp Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--ink)] mb-2">WhatsApp Number</label>
            <input type="text" value={whatsappNumber} placeholder="+49 176 12345678"
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full px-4 py-2 rounded-[12px] bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--ink)]" />
            <p className="text-xs text-[var(--muted)] mt-1">Format: 4917632333257 (no + or spaces). Note: update NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local to apply to the live site.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--ink)] mb-2">Welcome Message Template</label>
            <textarea rows={3} value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              className="w-full px-4 py-2 rounded-[12px] bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--ink)] resize-none" />
          </div>
        </div>
      </div>
      <div className="bg-[var(--canvas)] p-6 rounded-[16px] border border-[var(--hairline)]">
        <h3 className="text-lg font-semibold text-[var(--ink)] mb-4">Store Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--ink)] mb-2">Store Name</label>
            <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)}
              className="w-full px-4 py-2 rounded-[12px] bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--ink)]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--ink)] mb-2">Contact Email</label>
            <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-[12px] bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--ink)]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--ink)] mb-2">Free Shipping Threshold (€)</label>
            <input type="number" value={freeShippingThreshold}
              onChange={(e) => setFreeShippingThreshold(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 rounded-[12px] bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--ink)]" />
          </div>
        </div>
      </div>
      <Button onClick={saveAll} disabled={saving}>
        {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        Save All Settings
      </Button>
    </div>
  );
}
