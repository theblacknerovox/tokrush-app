'use client';

import { useState, useEffect } from 'react';

interface ClientFormattedNumberProps {
    value: number;
}

export default function ClientFormattedNumber({ value }: ClientFormattedNumberProps) {
    const [formattedValue, setFormattedValue] = useState(value.toString());

    useEffect(() => {
        setFormattedValue(value.toLocaleString());
    }, [value]);

    return <>{formattedValue}</>;
}
