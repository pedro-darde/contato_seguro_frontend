import {useEffect, useState} from "react";
import {Grid, Container, IconButton, Input, Select, Option, Autocomplete} from "@mui/joy";
import { Add } from "@mui/icons-material";
type CrudHeaderProps = {
  onAddClick(): void;
  onSearch(value: string, field: string): void;
  searchAll(): void,
  searchFieldOption: Array<{ label: string; value: string, fieldType?: string }>;
};

export default function CrudHeader({
  onAddClick,
  onSearch,
  searchFieldOption,
  searchAll,
}: CrudHeaderProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchOption, setSearchOption] = useState<{ label: string, value: string, fieldType?: string}>({label: "", value: "", fieldType: ""});
  const [fieldSearchType, setFieldSearchType] = useState<string>("text")
  useEffect(() => {
    handleSearch()
  }, [searchValue])

  const handleSearch = () => {
    if (searchOption.value) {
      if(!searchValue) {
        searchAll()
      } else {
        onSearch(searchValue, searchOption.value)
      }
    }
  }
  return (
    <Container>
      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        <Grid xs={2}>
          <IconButton
            sx={{ backgroundColor: "black", color: "white" }}
            onClick={() => onAddClick()}
          >
            <Add></Add>
          </IconButton>
        </Grid>
        <Grid xs={6}>
          <Input type={fieldSearchType} disabled={!searchOption.value} placeholder="Buscar..." value={searchValue} onChange={(e) => { setSearchValue(e.target.value)}}/>
        </Grid>
        <Grid xs={4}>
          <Autocomplete placeholder={"Campo de busca"} options={searchFieldOption} getOptionLabel={item => item.label} value={searchOption} onChange={(e, value) => {
              const searchOption = value ?? { label: "", value: ""}
              console.log(value?.fieldType)
              setFieldSearchType(value?.fieldType ?? "text")
              setSearchOption(searchOption)
          }} />
        </Grid>
      </Grid>
    </Container>
  );
}
