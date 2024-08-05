import { useState } from 'react';
import Header from './_components/Header';

export default function Store() {
  const [filter, setFilter] = useState({
    category: '',
    search: '',
    sort: ''
  });
  return (
    <main className="h-screen flex-1">
      <Header setFilter={setFilter} />
    </main>
  );
}
