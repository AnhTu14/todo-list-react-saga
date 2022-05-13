import { Box, Grid, Select, MenuItem, Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { City, ListParams } from "modules";
import React, { ChangeEvent, useRef } from "react";

export interface studentFilterProps {
  filter: ListParams;
  cityList: City[];

  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function studentFilter({
  filter,
  cityList,
  onChange,
  onSearchChange,
}: studentFilterProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter: ListParams = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };
    onSearchChange(newFilter);
  };

  const handleCityChange = (
    e: ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    if (!onChange) return;
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      city: e.target.value || undefined,
    };
    onChange(newFilter);
  };

  const handleSortChange = (
    e: ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    if (!onChange) return;

    const value = e.target.value;
    const [_sort, _order] = (value as string).split(".");
    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as "asc" | "desc") || undefined,
    };
    onChange(newFilter);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Tìm kiếm</InputLabel>
            <OutlinedInput
              id="searchByName"
              label="Search by name"
              //   endAdornment={<Search />}
              defaultValue={filter.name_like}
              onChange={handleSearchChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="filterByCity">Lọc </InputLabel>
            <Select
              labelId="filterByCity"
              value={filter.city || ""}
              onChange={handleCityChange}
              label="Filter by city"
            >
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>

              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={2}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="sortBy">Sắp xếp</InputLabel>
            <Select
              labelId="sortBy"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ""}
              onChange={handleSortChange}
              label="Sort"
            >
              <MenuItem value="">
                <em>Mặc định</em>
              </MenuItem>

              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>
              <MenuItem value="mark.asc">Mark ASC</MenuItem>
              <MenuItem value="mark.desc">Mark DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* <Grid item xs={12} md={6} lg={1}>
          <Button variant="outlined" color="primary" fullWidth onClick={handleClearFilter}>
            Clear
          </Button>
        </Grid> */}
      </Grid>
    </Box>
  );
}
