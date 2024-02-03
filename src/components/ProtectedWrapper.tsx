// options 1
import { Outlet } from 'react-router-dom';
import { useUser } from '../contexts/useUser';

export default function ProtectedWrapper() {
  const {
    userData: { isAuth },
  } = useUser();

  if (!isAuth) {
    window.location.href = '/';
  } else {
    return <Outlet />;
  }
}

// options 2

// import { useUser } from '../contexts/useUser';

// export default function ProtectedWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const {
//     userData: { isAuth },
//   } = useUser();

//   if (!isAuth) {
//     window.location.href = '/';
//   } else {
//     return children;
//   }

//   // if (isAuth) return children;
// }

// options 3

// import { useNavigate } from 'react-router-dom';
// import { useUser } from '../contexts/useUser';
// import { useEffect } from 'react';

// export default function ProtectedWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const navigate = useNavigate();
//   const {
//     userData: { isAuth },
//   } = useUser();

//   useEffect(() => {
//     if (!isAuth) {
//       navigate('/');
//     }
//   }, [isAuth, navigate]);
//   if (isAuth) return children;
// }
