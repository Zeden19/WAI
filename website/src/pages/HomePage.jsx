import { getNameFromLink } from "@/lib/utils.ts";
import {
    getLoggedInUser,
    getUserProfiles as getUserProfilesDB,
    getSharedProfiles as getSharedProfilesDB
} from "@/lib/firebaseFunctions.js";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";

function HomePage() {
    const user = getLoggedInUser();
    const [profiles, setProfiles] = useState(null);
    const [sharedProfiles, setSharedProfiles] = useState(null);

    useEffect(() => {
        async function getUserProfiles() {
            const data = await getUserProfilesDB(user);
            setProfiles(data);
        }

        async function getSharedProfiles() {
            const data = await getSharedProfilesDB(user);
            setSharedProfiles(data);
        }

        getUserProfiles().then(r => r);
        getSharedProfiles().then(r => r);
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
                      </TableRow>
                  </TableHeader>

                  <TableBody>
                      {profiles && profiles.length !== 0 ? (profiles.map(profile =>
                        <TableRow key={"profile-" + profile.link}>
                            <TableCell>{getNameFromLink(profile.link)}</TableCell>
                            <TableCell><a className={"underline text-blue-500"}
                                          href={profile.link}>{profile.link}</a></TableCell>
                        </TableRow>
                      )) : <div>No Data</div>}
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
                          <TableHead>Adder</TableHead>
                      </TableRow>
                  </TableHeader>

                  <TableBody>
                      {sharedProfiles && sharedProfiles.length !== 0 ? (sharedProfiles.map(profile =>
                        <TableRow key={"shared-" + profile.link}>
                            <TableCell>{getNameFromLink(profile.link)}</TableCell>
                            <TableCell><a className={"underline text-blue-500"}
                                          href={profile.link}>{profile.link}</a></TableCell>
                            <TableCell>{profile.adderEmail}</TableCell>
                        </TableRow>
                      )) : <TableRow className={"text-center"}>
                          <TableCell colSpan={3}>
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