my @a;

for 'input'.IO.lines {
    my ($i, $i1) = $_.trans('FL' => '0').trans('BR' => '1').comb(7).split(' ');
    $i = $i.parse-base(2) * 8 + $i1.parse-base(2);
    @a.append($i);
}

my $int = @a.values.min;
until !@a.match($int) {
    $int++;
}
say 'Part 1 ', @a.values.max, ' Part 2 ', $int;