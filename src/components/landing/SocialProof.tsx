import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Users, GraduationCap, Code2, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type Stat = {
  icon: typeof Users;
  value: number;
  suffix: string;
  decimals?: number;
  labelKey: string;
};

const stats: Stat[] = [
  { icon: Users, value: 12000, suffix: '+', labelKey: 'landing.stat_learners' },
  { icon: GraduationCap, value: 4500, suffix: '+', labelKey: 'landing.stat_kids' },
  { icon: Code2, value: 80000, suffix: '+', labelKey: 'landing.stat_challenges' },
  { icon: Sparkles, value: 4.9, suffix: '/5', decimals: 1, labelKey: 'landing.stat_rating' },
];

const testimonials = [
  { quoteKey: 'landing.testimonial_1_quote', nameKey: 'landing.testimonial_1_name', roleKey: 'landing.testimonial_1_role' },
  { quoteKey: 'landing.testimonial_2_quote', nameKey: 'landing.testimonial_2_name', roleKey: 'landing.testimonial_2_role' },
  { quoteKey: 'landing.testimonial_3_quote', nameKey: 'landing.testimonial_3_name', roleKey: 'landing.testimonial_3_role' },
];

const formatNumber = (n: number, decimals = 0) => {
  if (decimals > 0) return n.toFixed(decimals);
  return Math.floor(n).toLocaleString('en-US');
};

const useCountUp = (target: number, start: boolean, duration = 1500, decimals = 0) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const begin = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - begin) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return formatNumber(value, decimals);
};

const StatItem = ({ stat, start }: { stat: Stat; start: boolean }) => {
  const display = useCountUp(stat.value, start, 1500, stat.decimals ?? 0);
  const { t } = useTranslation();
  const Icon = stat.icon;
  return (
    <div className="flex flex-col items-center text-center space-y-2">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="text-4xl sm:text-5xl font-bold text-gradient-primary tabular-nums">
        {display}
        <span>{stat.suffix}</span>
      </div>
      <p className="text-sm text-muted-foreground">{t(stat.labelKey)}</p>
    </div>
  );
};

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const SocialProof = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">{t('landing.social_title')}</h2>
          <p className="mt-2 text-muted-foreground">{t('landing.social_subtitle')}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6 mb-20">
          {stats.map((s) => (
            <StatItem key={s.labelKey} stat={s} start={inView} />
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map(({ quoteKey, nameKey, roleKey }) => {
            const name = t(nameKey);
            return (
              <Card key={quoteKey} className="glass-card h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    &ldquo;{t(quoteKey)}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {initials(name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{name}</p>
                      <p className="text-xs text-muted-foreground truncate">{t(roleKey)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
