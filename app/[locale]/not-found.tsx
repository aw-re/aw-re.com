import Link from "next/link";
export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page not found · الصفحة غير موجودة</p>
      <Link href="/en" className="button">
        Home · الرئيسية
      </Link>
    </div>
  );
}
