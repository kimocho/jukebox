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

export const getTracks = async () => {
  const sql = `SELECT * FROM tracks`;
  const { rows: tracks } = await db.query(sql);
  return tracks;
}

export const getTrack = async (id) => {
  const sql = `SELECT * FROM tracks WHERE id=$1`;
  const { rows: [track] } = await db.query(sql, [id]);
  return track;
}

export const getTracksByPlaylist = async (id) => {
  const sql = `
    SELECT tracks.*
    FROM tracks JOIN playlists_tracks ON playlists_tracks.track_id = tracks.id
    JOIN playlists ON playlists.id = playlists_tracks.playlist_id
    WHERE playlists.id = $1
  `;
  const { rows: tracks } = await db.query(sql, [id]);
  return tracks;
}

export const addTrack = async (playlistId, trackId) => {
  const sql = `
    INSERT INTO playlists_tracks (playlist_id, track_id)
    VALUES ($1,$2)
    RETURNING *
  `;
  const { rows: [newTrack] } = await db.query(sql, [playlistId, trackId]);
  return newTrack;
}

export async function createPlaylistTrack(playlistId, trackId) {
  const sql = `
  INSERT INTO playlists_tracks
    (playlist_id, track_id)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [playlistTrack],
  } = await db.query(sql, [playlistId, trackId]);
  return playlistTrack;
}