import { useMemo, useState } from "react";
import {
  BedDouble,
  MoreHorizontal,
  Plus,
  Search,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import RoomStatusBadge from "@/components/rooms/RoomStatusBadge";
import {
  rooms,
  roomStatuses,
  roomTypes,
} from "@/constants/rooms";

function Rooms() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [type, setType] = useState("All");

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesSearch =
        room.number.toLowerCase().includes(search.toLowerCase()) ||
        room.type.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "All" || room.status === status;

      const matchesType =
        type === "All" || room.type === type;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [search, status, type]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Rooms
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage rooms, availability and room types.
          </p>
        </div>

        <Button>
          <Plus className="mr-2 size-4" />
          Add Room
        </Button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Rooms
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              {rooms.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Available
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {rooms.filter((room) => room.status === "Available").length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Occupied
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold text-blue-600">
              {rooms.filter((room) => room.status === "Occupied").length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Maintenance
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              {rooms.filter((room) => room.status === "Maintenance").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Room Table */}
      <Card>
        <CardHeader>
          <CardTitle>Room Inventory</CardTitle>
        </CardHeader>

        <CardContent>

          {/* Filters */}
          <div className="mb-6 flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search room number or type..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                className="pl-9"
              />
            </div>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              className="h-9 rounded-md border bg-background px-3 text-sm"
            >
              <option value="All">All Statuses</option>

              {roomStatuses.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={type}
              onChange={(event) =>
                setType(event.target.value)
              }
              className="h-9 rounded-md border bg-background px-3 text-sm"
            >
              <option value="All">All Room Types</option>

              {roomTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium text-muted-foreground">
                    Room
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Type
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Floor
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Capacity
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Price / Night
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="pb-3" />
                </tr>
              </thead>

              <tbody>
                {filteredRooms.map((room) => (
                  <tr
                    key={room.id}
                    className="border-b last:border-0"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                          <BedDouble className="size-4" />
                        </div>

                        <div>
                          <p className="font-medium">
                            Room {room.number}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {room.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4">
                      {room.type}
                    </td>

                    <td className="py-4">
                      Floor {room.floor}
                    </td>

                    <td className="py-4">
                      <div className="flex items-center gap-1">
                        <Users className="size-4 text-muted-foreground" />
                        {room.capacity}
                      </div>
                    </td>

                    <td className="py-4 font-medium">
                      ₹{room.price.toLocaleString("en-IN")}
                    </td>

                    <td className="py-4">
                      <RoomStatusBadge status={room.status} />
                    </td>

                    <td className="py-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                      >
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRooms.length === 0 && (
            <div className="py-12 text-center">
              <BedDouble className="mx-auto size-10 text-muted-foreground" />

              <h3 className="mt-4 font-medium">
                No rooms found
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Rooms;