import { useState, useEffect } from 'react';
import Card from '../Cards/Card';
import CardHeader from '../Cards/CardHeader';
import CardBody from '../Cards/CardBody';
import CardFooter from '../Cards/CardFooter';

/**
 * PokemonCard — fetches real types + base stats from PokeAPI.
 * Falls back gracefully if the detail request fails.
 */
const PokemonCard = ({ data }) => {
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    // data.url is provided by the list endpoint e.g. ".../pokemon/1/"
    if (data?.url) {
      fetch(data.url)
        .then((r) => r.json())
        .then(setDetail)
        .catch(() => setDetail(null));
    }
  }, [data?.url]);

  // derive values — fall back to data.codigo if detail not yet loaded
  const id     = detail?.id ?? data?.codigo ?? '?';
  const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  const types  = detail?.types?.map((t) => t.type.name) ?? [];
  const statsMap = {};
  detail?.stats?.forEach((s) => { statsMap[s.stat.name] = s.base_stat; });

  const hp  = statsMap['hp']      ?? '—';
  const atk = statsMap['attack']  ?? '—';
  const def = statsMap['defense'] ?? '—';

  // stagger animation by card index (uses inline style)
  const styleDelay = { animationDelay: `${(id % 20) * 30}ms` };

  return (
    <Card
      cardHeader={
        <CardHeader>
          <img
            className="poke-card__sprite"
            src={sprite}
            alt={data.name}
          />
          <span className="poke-card__id">#{String(id).padStart(3, '0')}</span>
        </CardHeader>
      }
      cardBody={
        <CardBody>
          <h2 className="poke-card__name">{data.name}</h2>

          {/* Type badges — only shown when detail is loaded */}
          {types.length > 0 && (
            <div className="poke-card__types">
              {types.map((t) => (
                <span key={t} className={`type-badge type-${t}`}>
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Stat strip */}
          <div className="poke-card__stats">
            <div className="stat-col">
              <span className="stat-label">HP</span>
              <span className="stat-value">{hp}</span>
            </div>
            <div className="stat-col">
              <span className="stat-label">ATK</span>
              <span className="stat-value">{atk}</span>
            </div>
            <div className="stat-col">
              <span className="stat-label">DEF</span>
              <span className="stat-value">{def}</span>
            </div>
          </div>
        </CardBody>
      }
      cardFooter={
        <CardFooter>
          <button className="btn-detail">Detalles</button>
        </CardFooter>
      }
    />
  );
};

export default PokemonCard;
