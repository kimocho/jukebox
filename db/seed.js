import db from "#db/client";
import { createPlaylistTracks, createTrack, getTracksByPlaylist } from "./queries/tracks.js";
import { createPlaylist } from "./queries/playlist.js";

async function seed() {
  // TODO
  await db.connect();
  for (let i = 1; i <= 20; i++) {
    await createPlaylist("Playlist " + i, "lorem ipsum playlist description");
    await createTrack("Track " + i, i * 50000);
  }
  for (let i = 1; i <= 15; i++) {
    const playlistId = 1 + Math.floor(i / 2);
    await createPlaylistTracks(playlistId, i);
  }

  console.log(await getTracksByPlaylist(2));
  // const track1 = await createTrack('what_do_you_mean', 5);
  // const track2 = await createTrack('never_say_never', 3);
  // const track3 = await createTrack('cruel_summer', 4);
  // const track4 = await createTrack('shake_it_off', 3);
  // const track5 = await createTrack('payphone', 5);
  // const track6 = await createTrack('one_more_night', 5);
  // const track7 = await createTrack('harder_to_breathe', 3);
  // const track8 = await createTrack('naturally', 4);
  // const track9 = await createTrack('magic', 5);
  // const track10 = await createTrack('bye_bye_bye', 5);
  // const track11 = await createTrack('pop', 3);
  // const track12 = await createTrack('gone', 4);
  // const track13 = await createTrack('sailing', 5);
  // const track14 = await createTrack('better_place', 4);
  // const track15 = await createTrack('everybody', 3);
  // const track16 = await createTrack('drowning', 4);
  // const track17 = await createTrack('breaking_the_habit', 5);
  // const track18 = await createTrack('in_the_end', 4);
  // const track19 = await createTrack('new_divide', 3);
  // const track20 = await createTrack('crawling', 5);

  // const playlist1 = await createPlaylist('justin_bieber', 'songs_by_bieber');
  // const playlist2 = await createPlaylist('maroon5', 'songs_by_maroon5');
  // const playlist3 = await createPlaylist('nsync', 'songs_by_nsync');
  // const playlist4 = await createPlaylist('backstreet_boys', 'songs_by_backstreet_boys');
  // const playlist5 = await createPlaylist('linkin_park', 'songs_by_linkin_park');
  // const playlist6 = await createPlaylist('random_mix', 'enjoy_random_mix');
  // const playlist7 = await createPlaylist('pop_music', 'list_of_pop');
  // const playlist8 = await createPlaylist('90s_music', '90s_era');
  // const playlist9 = await createPlaylist('2000s_music', '2000s_era');
  // const playlist10 = await createPlaylist('2010s_music', '2010s_era');

  // await createPlaylistTracks(playlist1.id, track1.id);
  // await createPlaylistTracks(playlist2.id, track2.id);
  // await createPlaylistTracks(playlist3.id, track3.id);
  // await createPlaylistTracks(playlist4.id, track4.id);
  // await createPlaylistTracks(playlist5.id, track5.id);
  // await createPlaylistTracks(playlist6.id, track6.id);
  // await createPlaylistTracks(playlist7.id, track7.id);
  // await createPlaylistTracks(playlist8.id, track8.id);
  // await createPlaylistTracks(playlist9.id, track9.id);
  // await createPlaylistTracks(playlist10.id, track10.id);
  // await createPlaylistTracks(playlist1.id, track11.id);
  // await createPlaylistTracks(playlist2.id, track12.id);
  // await createPlaylistTracks(playlist3.id, track13.id);
  // await createPlaylistTracks(playlist4.id, track14.id);
  // await createPlaylistTracks(playlist5.id, track15.id);

  await db.end();
  console.log("🌱 Database seeded.");
}

seed();