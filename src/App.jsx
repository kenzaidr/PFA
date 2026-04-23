import { RouterProvider, useRouter } from './router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import Landing            from './pages/Landing';
import CVUpload           from './pages/CVUpload';
import Login              from './pages/Login';
import StudentLogin       from './pages/StudentLogin';
import RecruiterLogin     from './pages/RecruiterLogin';
import SchoolLogin        from './pages/SchoolLogin';
import Register           from './pages/Register';
import StudentRegister    from './pages/StudentRegister';
import RecruiterRegister  from './pages/RecruiterRegister';
import SchoolRegister     from './pages/SchoolRegister';
import StudentDashboard   from './pages/StudentDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import SchoolDashboard    from './pages/SchoolDashboard';
import Checkout           from './pages/Checkout';

/* Pages that share the landing Navbar + Footer */
const WITH_NAV    = ['home', 'upload', 'login', 'student-login', 'recruiter-login', 'school-login', 'register', 'student-register', 'recruiter-register', 'school-register', 'checkout'];
const WITH_FOOTER = ['home'];

function AppShell() {
  const { page } = useRouter();

  const renderPage = () => {
    switch (page) {
      case 'home':               return <Landing />;
      case 'upload':             return <CVUpload />;
      case 'login':              return <Login />;
      case 'student-login':      return <StudentLogin />;
      case 'recruiter-login':    return <RecruiterLogin />;
      case 'school-login':       return <SchoolLogin />;
      case 'register':           return <Register />;
      case 'student-register':   return <StudentRegister />;
      case 'recruiter-register':return <RecruiterRegister />;
      case 'school-register':    return <SchoolRegister />;
      case 'dashboard-student':  return <StudentDashboard />;
      case 'dashboard-recruiter':return <RecruiterDashboard />;
      case 'dashboard-school':   return <SchoolDashboard />;
      case 'checkout':           return <Checkout />;
      default:                   return <Landing />;
    }
  };

  const showNav    = WITH_NAV.includes(page);
  const showFooter = WITH_FOOTER.includes(page);

  return (
    <div id="app-root" className="relative min-h-screen">
      {showNav && <Navbar />}
      <main className={showNav ? 'pt-[120px]' : ''}>
        {renderPage()}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppShell />
    </RouterProvider>
  );
}


