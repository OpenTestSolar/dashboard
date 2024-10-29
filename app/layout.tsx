// import 'tdesign-react/dist/tdesign.css';
import { MyLayoutProps } from '@/app/lib/common';
import SharedLayout from '@/components/SharedLayout/SharedLayout';

export default async function RootLayout({ children }: MyLayoutProps) {
  return (
    <html>
      <body>
        <SharedLayout>{children}</SharedLayout>
      </body>
    </html>
  );
}
