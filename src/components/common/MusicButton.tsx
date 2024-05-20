'use client';
import { useRecoilState } from 'recoil';
import Button from './Button';
import icons from '@/lib/icons';
import { MutedAtom } from '@/recoil/atoms/MutedAtom';
import { useEffect } from 'react';
import Tooltip from './Tooltip';

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
      <Tooltip title={muted ? 'Unmute' : 'Mute'}>
        <Button onClick={handleToggleMute} className="text-xl">
          {muted ? icons.musicNoteMuted : icons.musicNote}
        </Button>
      </Tooltip>
    );
}
