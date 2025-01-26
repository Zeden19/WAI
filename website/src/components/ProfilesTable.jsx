import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { SquareArrowOutUpRight } from "lucide-react";
import { getNameFromLink } from "@/lib/utils.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { useNavigate } from "react-router";
import useGlobalStore from "@/store.js";


function ProfilesTable({ profiles, shareProfiles }) {
    const navigate = useNavigate();
    const setSelectedProfile = useGlobalStore((state) => state.setSelectedProfile);

    return (
      <Table className={"rounded"}>
          <TableHeader>
              <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead>Photo</TableHead>
                  {shareProfiles && (<>
                      <TableHead>Adder</TableHead>
                      <TableHead>Adder Photo</TableHead>
                  </>)}
              </TableRow>
          </TableHeader>

          <TableBody>
              {profiles && profiles.length !== 0 ? (profiles.map(profile =>
                <TableRow key={"profile-" + profile.link}>
                    <TableCell className={"cursor-pointer"} onClick={() => {
                        setSelectedProfile(profile)
                        navigate(`/profile/${profile.id}`)
                    }}>
                        {/*still strange how we have the profile and then retrieve it AGAIN*/}
                        <SquareArrowOutUpRight
                          className={"inline mr-2"} />
                        {getNameFromLink(profile.link)}
                    </TableCell>
                    <TableCell><a target={"_blank"} className={"underline text-blue-500"}
                                  href={profile.link}>{profile.link}</a></TableCell>
                    <TableCell>
                        <Avatar>
                            <AvatarImage src={profile.imageURL} />
                            <AvatarFallback>{getNameFromLink(profile.link).slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </TableCell>
                    {shareProfiles && (<>
                        <TableCell>{profile.adderName}</TableCell>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={profile.adderImage} />
                                <AvatarFallback>{profile.adderName.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </TableCell>
                    </>)}
                </TableRow>
              )) : <TableRow className={"text-center"}>
                  <TableCell colSpan={5}>
                      <div>No Data</div>
                  </TableCell>
              </TableRow>}
          </TableBody>
      </Table>
    );
}

export default ProfilesTable;