import { useState } from "react";
import { Grid, Container, IconButton, Input, Select, Option} from "@mui/joy"
import { Add } from "@mui/icons-material"
type CrudHeaderProps = {
    onAddClick(): void,
    onSearch(value: string, field: string): void;
    searchFieldOption: Array<{ label: string, value: string}>
}

export default function CrudHeader({ onAddClick, onSearch, searchFieldOption }: CrudHeaderProps) {
    const [searchValue, setSearchValue] = useState<string>("")
    const [searchOption, setSearchOption] = useState<string>("")

    return (
        <Container maxWidth="xs">
            <Grid container spacing={3} sx={{ flexGrow: 1 }}>
                <Grid xs={2}>
                    <IconButton sx={{ backgroundColor: "black"}}>
                        <Add></Add>
                    </IconButton>
                </Grid>
                <Grid xs={6}>
                    <Input placeholder="Buscar..." />
                </Grid>
                <Grid>
                    <Select placeholder="Campo de busca">
                        {searchFieldOption.map(({ label, value }) => <Option value={value}> {label}</Option>)}
                    </Select>
                </Grid>
            </Grid>
        </Container>
    )
}