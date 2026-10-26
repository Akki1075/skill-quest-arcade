import React, { useEffect, useMemo, useState } from 'react';
import {
  BADGES,
  MAX_LEVELS,
  TRACKS,
  getLevelData,
  type Profile,
  type ProfileProgress,
  type TrackId
} from '@/lib/game-data';
import { loadProfiles, saveProfiles } from '@/lib/storage';

const STORAGE_DEFAULT = 'PlayerOne';

const defaultProgress = (): ProfileProgress => ({
  current: 1,
  unlocked: 1,
  completed: [],
  xp: 0,
  badges: []
});

export default function SkillQuestApp() {
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [activeProfile, setActiveProfile] = useState<string>('');
  const [selectedTrack, setSelectedTrack] = useState<TrackId>('sql');
  const [answer, setAnswer] = useState('');
  const [hintVisible, setHintVisible] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [profileInput, setProfileInput] = useState('');

  useEffect(() => {
    const saved = loadProfiles();

    if (!saved || Object.keys(saved).length === 0) {
      const starter: Record<string, Profile> = {
        [STORAGE_DEFAULT]: {
          username: STORAGE_DEFAULT,
          selectedTrack: 'sql',
          progress: {
            sql: defaultProgress(),
            excel: defaultProgress(),
            powershell: defaultProgress()
          }
        }
      };
      setProfiles(starter);
      setActiveProfile(STORAGE_DEFAULT);
      setSelectedTrack('sql');
      saveProfiles(starter);
      return;
    }

    const usernames = Object.keys(saved);
    setProfiles(saved);
    setActiveProfile(usernames[0]);
    setSelectedTrack(saved[usernames[0]].selectedTrack || 'sql');
  }, []);

  const currentProfile = activeProfile ? profiles[activeProfile] : null;
  const currentProgress = currentProfile?.progress?.[selectedTrack] ?? defaultProgress();
  const currentLevel = getLevelData(selectedTrack, currentProgress.current || 1);

  const availableBadges = useMemo(() => {
    if (!currentProfile) return [];
    return BADGES.filter((badge) => currentProfile.progress[selectedTrack]?.badges?.includes(badge.id));
  }, [currentProfile, selectedTrack]);

  const saveCurrentState = (nextProfiles: Record<string, Profile>) => {
    setProfiles(nextProfiles);
    saveProfiles(nextProfiles);
  };

  const createProfile = (name: string) => {
    const clean = name.trim();
    if (!clean) {
      alert('Please enter a profile name');
      return;
    }

    if (profiles[clean]) {
      setActiveProfile(clean);
      setSelectedTrack(profiles[clean].selectedTrack || 'sql');
      return;
    }

    const nextProfiles = {
      ...profiles,
      [clean]: {
        username: clean,
        selectedTrack: 'sql',
        progress: {
          sql: defaultProgress(),
          excel: defaultProgress(),
          powershell: defaultProgress()
        }
      }
    };

    setActiveProfile(clean);
    setSelectedTrack('sql');
    saveCurrentState(nextProfiles);
  };

  const setTrack = (trackId: TrackId) => {
    if (!currentProfile) return;

    const nextProfiles = {
      ...profiles,
      [activeProfile]: {
        ...currentProfile,
        selectedTrack: trackId
      }
    };

    setSelectedTrack(trackId);
    saveCurrentState(nextProfiles);
  };

  const trackProgressSummary = (trackId: TrackId) => {
    const profile = profiles[activeProfile];
    if (!profile || !profile.progress || !profile.progress[trackId]) {
      return defaultProgress();
    }
    return profile.progress[trackId];
  };

  const normalizeAnswer = (value: string) =>
    value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/["'`]/g, '')
      .replace(/;/g, '')
      .replace(/\s+/g, ' ');

  const isCorrect = (input: string, answer: string) => {
    const nInput = normalizeAnswer(input);
    const nAnswer = normalizeAnswer(answer);
    if (!nInput || !nAnswer) return false;
    return nInput === nAnswer || nInput.includes(nAnswer) || nAnswer.includes(nInput);
  };

  const assignBadges = (trackId: TrackId, completedCount: number) => {
    const earned = new Set<string>();
    BADGES.forEach((badge) => {
      if (completedCount >= badge.requirement) earned.add(badge.id);
    });
    return Array.from(earned);
  };

  const solveCurrentLevel = () => {
    if (!currentProfile) return;

    const trackId = selectedTrack;
    const progress = currentProfile.progress[trackId];
    const current = Math.min(Math.max(progress.current, 1), MAX_LEVELS);
    const level = getLevelData(trackId, current);

    if (!level) return;

    if (!isCorrect(answer, level.answer)) {
      setResult({ type: 'error', message: 'Not quite — check the lesson, hint, and try again.' });
      return;
    }

    const nextProfiles = { ...profiles };
    const currentUser = nextProfiles[activeProfile];
    const trackProgress = currentUser.progress[trackId];

    if (!trackProgress.completed.includes(current)) {
      trackProgress.completed.push(current);
      trackProgress.xp += 25 + current * 2;
    }

    trackProgress.unlocked = Math.min(Math.max(trackProgress.unlocked, current + 1), MAX_LEVELS);
    trackProgress.current = Math.min(current + 1, MAX_LEVELS);
    trackProgress.badges = assignBadges(trackId, trackProgress.completed.length);

    currentUser.selectedTrack = trackId;

    setProfiles(nextProfiles);
    saveProfiles(nextProfiles);
    setResult({ type: 'success', message: `Correct! ${level.concept} solved.` });
    setAnswer('');
    setHintVisible(false);
  };

  const goToPrevious = () => {
    if (!currentProfile) return;

    const trackId = selectedTrack;
    const progress = currentProfile.progress[trackId];
    progress.current = Math.max(1, progress.current - 1);

    const next = { ...profiles };
    saveCurrentState(next);
    setAnswer('');
    setResult(null);
    setHintVisible(false);
  };

  const goToNext = () => {
    if (!currentProfile) return;

    const trackId = selectedTrack;
    const progress = currentProfile.progress[trackId];
    if (progress.current >= progress.unlocked) {
      alert('Solve the current level before unlocking the next one.');
      return;
    }

    progress.current = Math.min(progress.current + 1, MAX_LEVELS);

    const next = { ...profiles };
    saveCurrentState(next);
    setAnswer('');
    setResult(null);
    setHintVisible(false);
  };

  if (!currentProfile) return null;

  const progress = currentProfile.progress[selectedTrack];
  const levelNumber = progress.current;
  const level = getLevelData(selectedTrack, levelNumber);

  const levelButtons = Array.from({ length: 18 }, (_, i) => i + 1);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-badge">Q</div>
          <h1>Skill Quest Arcade</h1>
        </div>

        <div className="topbar-right">
          <div className="pill">Track: {TRACKS[selectedTrack].name}</div>
          <div className="profile-pill">
            <span>Profile:</span> <strong>{currentProfile.username}</strong>
          </div>
        </div>
      </header>

      <div className="app-grid">
        <aside className="side-panel">
          <div className="panel-block">
            <h3>Profiles</h3>
            <div className="profile-list">
              {Object.keys(profiles).map((username) => (
                <button
                  key={username}
                  type="button"
                  className={`profile-option ${activeProfile === username ? 'active' : ''}`}
                  onClick={() => {
                    setActiveProfile(username);
                    setSelectedTrack(profiles[username].selectedTrack || 'sql');
                  }}
                >
                  {username}
                </button>
              ))}
            </div>

            <div className="profile-form">
              <input
                className="input"
                value={profileInput}
                onChange={(e) => setProfileInput(e.target.value)}
                placeholder="New profile name"
              />
              <button
                className="btn primary"
                type="button"
                onClick={() => {
                  createProfile(profileInput);
                  setProfileInput('');
                }}
              >
                Add
              </button>
            </div>
          </div>

          <div className="panel-block">
            <h3>Skills</h3>
            <div className="track-list">
              {(Object.keys(TRACKS) as TrackId[]).map((trackId) => {
                const prog = trackProgressSummary(trackId);
                return (
                  <div
                    key={trackId}
                    className={`track-item ${selectedTrack === trackId ? 'active' : ''}`}
                    onClick={() => setTrack(trackId)}
                  >
                    <div>
                      <div className="track-name" style={{ color: TRACKS[trackId].accent }}>
                        {TRACKS[trackId].name}
                      </div>
                      <div className="track-progress">Unlocked {prog.unlocked}/{MAX_LEVELS}</div>
                    </div>
                    <div className="track-progress">{Math.round((prog.completed.length / MAX_LEVELS) * 100)}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        <main className="content-panel">
          <div className="hero">
            <div>
              <small>Interactive Learning Game</small>
              <h2>{TRACKS[selectedTrack].name} Journey</h2>
            </div>

            <div className="hero-actions">
              <button className="btn secondary" type="button" onClick={goToPrevious}>Previous</button>
              <button className="btn primary" type="button" onClick={goToNext}>Next Level</button>
            </div>
          </div>

          <div className="stats">
            <div className="stat-card">
              <span className="stat-label">Current Level</span>
              <span className="stat-value">{progress.current}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">XP</span>
              <span className="stat-value">{progress.xp}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Completed</span>
              <span className="stat-value">{progress.completed.length}</span>
            </div>
          </div>

          <div className="level-layout">
            <aside className="level-panel">
              <div className="level-panel-header">
                <h3>Level Map</h3>
              </div>

              <div className="level-grid">
                {levelButtons.map((num) => {
                  const unlocked = num <= progress.unlocked;
                  const completed = progress.completed.includes(num);
                  const current = num === progress.current;

                  return (
                    <button
                      key={num}
                      type="button"
                      className={`level-button ${unlocked ? 'unlocked' : ''} ${completed ? 'completed' : ''} ${current ? 'current' : ''}`}
                      disabled={!unlocked}
                      onClick={() => {
                        if (unlocked) {
                          const nextProfiles = { ...profiles };
                          nextProfiles[activeProfile].progress[selectedTrack].current = num;
                          saveCurrentState(nextProfiles);
                        }
                      }}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
            </aside>

            <section className="level-card">
              <div className="level-meta">
                <span className="tag">{TRACKS[selectedTrack].name}</span>
                <span className="tag">{level.difficulty}</span>
                <span className="tag">{level.concept}</span>
              </div>

              <h3 className="level-title">Level {progress.current}</h3>
              <p className="mission-text">{level.mission}</p>

              <div className="info-box">
                <h4>Challenge</h4>
                <p>{level.challenge}</p>
              </div>

              <div className="info-box">
                <h4>Teach</h4>
                <p>{level.lesson}</p>
              </div>

              {hintVisible && (
                <div className="info-box">
                  <h4>Hint</h4>
                  <p>{level.hint}</p>
                </div>
              )}

              <div className="answer-box">
                <label>Your Answer</label>
                <textarea
                  className="textarea"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                />
              </div>

              <div className="actions">
                <button className="btn primary" type="button" onClick={solveCurrentLevel}>Check Answer</button>
                <button className="btn warning" type="button" onClick={() => setHintVisible(true)}>Show Hint</button>
                <button className="btn secondary" type="button" onClick={() => saveCurrentState({ ...profiles })}>Save</button>
              </div>

              {result && (
                <div className={`result ${result.type}`}>{result.message}</div>
              )}

              <div className="badges-wrap">
                {availableBadges.length === 0 ? (
                  <span className="badge">No badges earned yet</span>
                ) : (
                  availableBadges.map((badge) => (
                    <span key={badge.id} className="badge">
                      <span className="badge-dot" style={{ background: badge.color }} />
                      {badge.name}
                    </span>
                  ))
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
