'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';


const CountCard = ({ name, count }) => {
  return (
    <Card className="w-full bg-violet-900">

      <CardHeader>

        <CardTitle className="text-2xl tracking-wide">{name}s</CardTitle>

        <CardDescription className="text-lg tracking-wide">Total Number of {name}s</CardDescription>

      </CardHeader>

      <CardContent>
        <p className="text-4xl">{count}</p>
      </CardContent>

    </Card>
  );
};

export default CountCard;
