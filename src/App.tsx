import Card from './components/Card';
const singleData = {
  imgSrc:
    'https://images.unsplash.com/photo-1661869535393-872dea2d9f8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
  name: 'Adam',
  surname: 'Jochemczyk',
  street: 'TestStreet',
  postCode: '00-123',
  town: 'Town',
  subRegion: 'Region',
  phoneNumber: '+48 123 456 789',
};

export default function App() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-900 px-4">
      <Card data={singleData} />
    </main>
  );
}
