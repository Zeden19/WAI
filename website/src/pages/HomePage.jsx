import { getNameFromLink } from "@/lib/utils.ts";
import {
    getLoggedInUser,
    getUserProfiles as getUserProfilesDB,
    getSharedProfiles as getSharedProfilesDB
} from "@/lib/firebaseFunctions.js";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { SquareArrowOutUpRight } from "lucide-react";
import { Link } from "react-router";

function HomePage() {
    const user = getLoggedInUser();
    const [profiles, setProfiles] = useState(null);
    const [sharedProfiles, setSharedProfiles] = useState(null);
    // Make these entire context variables since updates are not showing

    useEffect(() => {
        async function getUserProfiles() {
            const data = await getUserProfilesDB(user);
            setProfiles(data);
        }

        async function getSharedProfiles() {
            const data = await getSharedProfilesDB(user);
            setSharedProfiles(data);
        }

        getUserProfiles();
        getSharedProfiles();
    }, []);


    return (
      <div className={"flex justify-around "}>
          <div>
              <h2 className={"font-bold text-3xl mb-2"}>Your Profiles</h2>
              <Table className={"rounded"}>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Link</TableHead>
                          <TableHead>Photo</TableHead>
                      </TableRow>
                  </TableHeader>

                  {/*the 2 tables should be a reusable component; editing both when i want to make a change sucks*/}
                  <TableBody>
                      {profiles && profiles.length !== 0 ? (profiles.map(profile =>
                        <TableRow key={"profile-" + profile.link}>
                            <TableCell>
                                <Link to={`profile/${profile.id}`}><SquareArrowOutUpRight
                                  className={"inline mr-2"} />{getNameFromLink(profile.link)}
                                </Link>
                            </TableCell>
                            <TableCell><a target={"_blank"} className={"underline text-blue-500"}
                                          href={profile.link}>{profile.link}</a></TableCell>
                            <TableCell><Avatar>
                                <AvatarImage src={profile.imageURL} />
                                <AvatarFallback>{getNameFromLink(profile.link).slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar></TableCell>
                        </TableRow>
                      )) : <TableRow className={"text-center"}>
                          <TableCell colSpan={5}>
                              <div>No Data</div>
                          </TableCell>
                      </TableRow>}
                  </TableBody>
              </Table>
          </div>
          <div>
              <h2 className={"font-bold text-3xl mb-2"}>Shared Profiles With You</h2>
              <Table className={"rounded"}>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Link</TableHead>
                          <TableHead>Photo</TableHead>
                          <TableHead>Adder</TableHead>
                          <TableHead>Adder Photo</TableHead>
                      </TableRow>
                  </TableHeader>

                  <TableBody>
                      {sharedProfiles && sharedProfiles.length !== 0 ? (sharedProfiles.map(profile =>
                        <TableRow key={"shared-" + profile.link}>
                            {/*the whole table cell (only text and icon is) is not clickable, so we need to modify the component to allow for clickable cell*/}
                            {/*Its also strange how we have the profile, but then have to regather the profile. maybe we can set some cookies/local storage so no duplicate get?*/}
                            <TableCell>
                                <Link to={`profile/${profile.id}`}><SquareArrowOutUpRight
                                  className={"inline mr-2"} />{getNameFromLink(profile.link)}
                                </Link>
                            </TableCell>
                            <TableCell><a target={"_blank"} className={"underline text-blue-500"}
                                          href={profile.link}>{profile.link}</a></TableCell>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={profile.imageURL} />
                                    <AvatarFallback>{getNameFromLink(profile.link).slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell>{profile.adderName}</TableCell>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={profile.adderImage} />
                                    <AvatarFallback>{profile.adderName.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </TableCell>
                        </TableRow>
                      )) : <TableRow className={"text-center"}>
                          <TableCell colSpan={5}>
                              <div>No Data</div>
                          </TableCell>
                      </TableRow>}
                  </TableBody>
              </Table>
          </div>
      </div>
    );
}

export default HomePage;