'use client';
import { useRecoilState } from 'recoil';
import Button from './Button';
import icons from '@/lib/icons';
import { MutedAtom } from '@/recoil/atoms/MutedAtom';
import { useEffect } from 'react';

export default function MusicButton() {
    const [muted, setMuted] = useRecoilState(MutedAtom);

    useEffect(() => {
        const localMuted = localStorage.getItem('muted');
        if (localMuted) {
            setMuted(JSON.parse(localMuted));
        }
    }, [setMuted])

    function handleToggleMute() {
        setMuted(!muted);
        localStorage.setItem('muted', JSON.stringify(!muted));
    }

    return (
      <Button onClick={handleToggleMute} className="p-2 text-xl">
        {muted ? icons.musicNoteMuted : icons.musicNote}
      </Button>
    );
}
