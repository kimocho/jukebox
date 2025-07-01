import db from '../client.js';

export const createTrack = async (name, durationMS) => {
  const sql = `
    INSERT INTO tracks (name, duration_ms)
    VALUES ($1, $2)
    RETURNING *
  `;
  const { rows: [track] } = await db.query(sql, [name, durationMS]);
  return track;
}

export const createPlaylistTracks = async (playlistId, trackId) => {
  const sql = `
    INSERT INTO playlists_tracks (playlist_Id, track_Id)
    VALUES ($1, $2)
    RETURNING *
  `;
  const { rows: [playlist] } = await db.query(sql, [playlistId, trackId]);
  return playlist;
}

export const getTracks = async () => {
  const sql = `
    SELECT * FROM tracks
  `;
  const { rows: tracks } = await db.query(sql);
  return tracks;
}

export const getTrack = async (id) => {
  const sql = `
    SELECT * FROM tracks WHERE id=$1
  `;
  const { rows: [track] } = await db.query(sql, [id]);
  return track;
}