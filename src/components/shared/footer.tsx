import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <Link href="/" className="font-bold text-primary text-xl">
            MediQueue Pro
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Providing accessible, top-rated healthcare appointments for everyone.
          </p>
        </div>
        
        {[
          { title: 'Services', links: ['Cardiology', 'Neurology', 'Pediatrics'] },
          { title: 'Company', links: ['About Us', 'Careers', 'Contact'] },
          { title: 'Support', links: ['FAQ', 'Privacy Policy', 'Terms'] },
        ].map((section) => (
          <div key={section.title} className="space-y-4">
            <h4 className="font-semibold text-foreground">{section.title}</h4>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} MediQueue Pro. All rights reserved.
      </div>
    </footer>
  );
};
